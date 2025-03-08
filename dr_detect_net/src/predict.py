import torch
from googlenet import RetinopathyModel
from read import get_transforms
import os
import glob
from PIL import Image
import numpy as np
import pandas as pd
from tqdm import tqdm

def predict_folder(model, folder_path, transform, extensions=('.jpg', '.jpeg', '.png')):
    """预测文件夹中的所有图片"""
    results = []
    # 获取所有图片文件
    image_files = []
    for ext in extensions:
        image_files.extend(glob.glob(os.path.join(folder_path, f'*{ext}')))
    
    print(f"\nProcessing {len(image_files)} images...")
    
    for img_path in tqdm(image_files):
        try:
            pred, probs = model.predict_image(img_path, transform)
            results.append({
                'image': os.path.basename(img_path),
                'prediction': pred,
                'confidence': probs[pred],
                'prob_class_0': probs[0],
                'prob_class_1': probs[1],
                'prob_class_2': probs[2],
                'prob_class_3': probs[3],
                'prob_class_4': probs[4]
            })
        except Exception as e:
            print(f"\nError processing {img_path}: {str(e)}")
    
    return pd.DataFrame(results)

def main():
    # 设置设备
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f'Using device: {device}')
    
    # 初始化模型
    model = RetinopathyModel(device)
    model.build_model()
    
    # 加载最佳模型
    model_path = 'models/best_model.pth'
    checkpoint = model.load_model(model_path)
    print(f"Loaded model from epoch {checkpoint['epoch']} with accuracy {checkpoint['best_acc']:.2f}%")
    
    # 获取验证转换
    _, valid_transform = get_transforms()
    
    while True:
        print("\n选择操作:")
        print("1. 预测单张图片")
        print("2. 预测文件夹")
        print("q. 退出")
        
        choice = input("输入选项: ")
        
        if choice.lower() == 'q':
            break
            
        elif choice == '1':
            image_path = input('输入图片路径: ')
            try:
                pred, probs = model.predict_image(image_path, valid_transform)
                print(f'\n预测类别: {pred}')
                print('各类别概率:')
                for i, prob in enumerate(probs):
                    print(f'类别 {i}: {prob:.4f}')
            except Exception as e:
                print(f'错误: {str(e)}')
                
        elif choice == '2':
            folder_path = input('输入文件夹路径: ')
            if not os.path.exists(folder_path):
                print("文件夹不存在!")
                continue
                
            # 预测文件夹中的所有图片
            results_df = predict_folder(model, folder_path, valid_transform)
            
            # 保存结果
            output_path = os.path.join(folder_path, 'predictions.csv')
            results_df.to_csv(output_path, index=False)
            print(f"\n预测结果已保存到: {output_path}")
            
            # 显示统计信息
            print("\n预测统计:")
            print(results_df['prediction'].value_counts().sort_index())
            print("\n平均置信度:", results_df['confidence'].mean())
        
        else:
            print("无效选项!")

if __name__ == '__main__':
    main()