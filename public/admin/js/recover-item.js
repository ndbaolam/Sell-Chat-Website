const recoverButtons = document.querySelectorAll("[recover-button ]");
if(recoverButtons.length > 0){
    const formRecover = document.querySelector("[form-recover-item]");
    const path = formRecover.getAttribute("data-path");

    recoverButtons.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Khôi phục sản phẩm này ?");

            if(isConfirm){
                const id = button.getAttribute("data-id");

                const action = `${path}/${id}?_method=PATCH`;
                
                formRecover.action = action;

                formRecover.submit();
            }
        });
    });
}

//Directed Button

const directedButton = document.querySelector("[button-redirect]");
directedButton.addEventListener("click", () => {
    window.location.href = "http://localhost:3000/admin/products";
});

//End Directed Button