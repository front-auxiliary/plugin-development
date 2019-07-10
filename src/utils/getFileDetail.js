export default (e,callback) => {
    let file = e.target.files[0];
    let imageType = /image.*/;
    if (file.type.match(imageType)) {
        let reader = new FileReader();
        reader.onload = function () {
            // const { fileUpload } = dreawData.getParams();
            callback && callback(file,reader.result)
            // fileUpload(file, reader.result)
        };
        reader.readAsDataURL(file);
    } else {
        alert(opts.errorMessage);
    }
}