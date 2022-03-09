import {useState} from 'react'
import { PlusOutlined } from '@ant-design/icons';
import {Upload, message, Modal} from 'antd';


export default function UploadComponent(props) {

    //imgList数组保存
    const [imgList,setImgList] = useState([]);
    //预览窗口是否打开
    const [previewVisible,setPreviewVisible] = useState(false);
    //预览的图片的URL
    const [previewImage,setPreviewImage] = useState('');
    //预览图片的名称
    const [previewTitle,setPreviewTitle] = useState('');


    /*文件上传之前执行的钩子函数
        若返回 false则停止上传。
        支持返回一个 Promise 对象，
            Promise 对象 reject 时则停止上传，
            resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）
     */
    const beforeUpload = (file) => {
        //支持上传的文件的类型为jpeg或者png类型的图片
        const isJpgOrPng = (file.type === 'image/jpeg' || file.type === 'image/png');
        //文件的大小是否小于2M
        const isLt2M = file.size / 1024 / 1024 < 2;
        if(!isLt2M) {
            message.error('图像不能超过2MB！');
        }
        return isJpgOrPng && isLt2M;
    }



    //读取文件
    const getBase64= (file)=> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }


    //点击文件链接或预览图标时的回调   function(file)
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewTitle( file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        setPreviewVisible(true);
    };


    //关闭预览的对话框
    const handleCancel = () => {
        setPreviewVisible(false);
    }


    /*上传中、完成、失败都会调用这个函数
         file: 当前操作的文件对象
         fileList: 当前的文件列表。
         event: 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持
    */
    const handleChange = ({fileList})=> {
        //上传文件状态改变时 更新添加imgList里面的文件记录信息
        setImgList(fileList);

        console.log(imgList);

        props.onChange(fileList)
    }




    //上传按钮
    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop:8}}>Upload</div>
        </div>
    )


    return (
        <>
            <Upload
                name='activeImg'
                listType='picture-card'
                fileList={imgList}
                action='ttp://localhost:8888/goods/upload'
                data={(file)=> ({
                    photoCotent: file
                })}
                beforeUpload={beforeUpload}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {imgList.length >= 2 ? null : uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel = {handleCancel}
            >
                <img src={previewImage} alt="预览的图片" style={{width: '100%'}} />
            </Modal>
        </>
    )
}



