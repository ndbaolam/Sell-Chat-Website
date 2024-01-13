//Recover Item
const buttonRecovers = document.querySelectorAll("[button-recover]");
if(buttonRecovers.length > 0){
    const formRecover = document.querySelector("[form-recover]");
    const path = formRecover.getAttribute("data-path");

    buttonRecovers.forEach(button => {
        button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");

        const action = `${path}/${id}?_method=PATCH`;

        formRecover.action = action;

        formRecover.submit();
        });
    });
}
//End recover item

//Permanent Delete Item
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0){
    const formRecover = document.querySelector("[form-recover]");
    const path = formRecover.getAttribute("data-path");

    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa bản ghi này?");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                
                formRecover.action = action;
                formRecover.submit();
            }
        });
    });
}
//End Permanent Delete Item