let arr = [22.5, 11, 21.5, 9.5, 23.5, 13.5, 52, 24.5];
arr = [];

let val = document.querySelectorAll(`tbody > tr > th:nth-child(2)`);
val.forEach((val) => {
  arr.push(+val.innerHTML);
});
console.log(arr);

for (let i = 0; i < 8; i++) {
  let milkType = document.querySelector(
    `#milkTable > table > tbody > tr:nth-child(${
      i + 1
    }) > th:nth-child(3) > input`
  );
  milkType.addEventListener("input", (e) => {
    let value = parseFloat(milkType.value);
    console.log(value);

    let milk_costs = document.querySelector(
      `#milkTable > table > tbody > tr:nth-child(${i + 1}) > th:nth-child(4)`
    );
    if (!isNaN(value)) {
      milk_costs.innerHTML = value * arr[i];
    } else {
      milk_costs.innerHTML = 0;
    }

    let total = 0;

    for (let i = 0; i < 8; i++) {
      let milk = document.querySelector(
        `#milkTable > table > tbody > tr:nth-child(${i + 1}) > th:nth-child(4)`
      );
      console.log(milk.innerHTML);
      if (milk.innerHTML != "") {
        let t_value = parseFloat(milk.innerHTML);
        total += t_value;
      }
    }

    total_value = document.querySelector(
      "#milkTable > table > tfoot > tr > th.total_value"
    );
    total_value.innerHTML = total;
  });
}
