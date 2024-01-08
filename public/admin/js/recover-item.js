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

//checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]"); 
if(checkboxMulti){
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if(inputCheckAll.checked){
      inputsId.forEach(input => {
        input.checked = true;
      });
    } else {
      inputsId.forEach(input => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach(input => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti
        .querySelectorAll("input[name='id']:checked")
        .length;
      if(countChecked == inputsId.length){
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
//End checkbox multi
