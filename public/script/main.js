const _main={};
_main.loadPage = function () {
    $.get("/public/localFile.html", function (data) {
       let  pageData=$("#root").append(data);
       
       //SECTION Multipart Form data
       let filesArr=[];

       //NOTE file selected
        pageData.find("#localFiles").change(function(e) {
            Array.from($(this)[0].files).forEach(
                fi=>{
                    filesArr.push(fi)
                }
            )
            $(this).val("")
            renderFiles()
        })
        pageData.on('click','[data-index]',function () {
            let index = $(this).data().index
            filesArr.splice(index,1);
            renderFiles();
        })

        //NOTE 
        function renderFiles() {
            let selectedField=""
            $("#seletedFiles").html("")
            filesArr.forEach((fi, index) => {
                selectedField += `<div>${fi.name}--<span style="cursor:pointer" data-index=${index} >X</span></div>`;
                $("#seletedFiles").append(selectedField)
            });
        }
        //NOTE upload button clicked
        pageData.find(".local-file-upload").click(function (e) {
            e.preventDefault()
            let formData = new FormData();
            console.log(filesArr)
            filesArr.forEach(f=>{
                formData.append('files',f)
            })
            console.log(formData)
            jQuery.ajax({
                url: 'localupload',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                method: 'POST',
                type: 'POST', 
                success: function (data) {
                    console.log(data)
                    $("#seletedFiles").append("<h1>uploaded</h1>")
                }
            });

        })

        //!SECTION 


        //SECTION FileReader
        let fileReaderArr=[]; 
        let fileBlob;
        pageData.find("#fileReaderField").change(
            function (e) {debugger
                let files = $(this)[0].files;
                let reader = new FileReader();
                reader.onload=function (e) {
                    fileBlob = { file: reader.result, fileType: files[0].type}
                }
                reader.readAsDataURL(files[0]); 
                
            }
        )
        pageData.find("#fileReaderButton").click(function () {
            jQuery.ajax({
                url: 'localFileUploadByFileReader',
                data: fileBlob,
                type: 'POST',
                success: function (data) {
                    
                }
            });
        })
        //!SECTION 
    });
}
$(_main.loadPage())

