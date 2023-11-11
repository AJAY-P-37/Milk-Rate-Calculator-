const getMilkRate = async () => {
  const response = await fetch(
    "https://milk-rate-default-rtdb.asia-southeast1.firebasedatabase.app/milk.json"
  );

  if (!response.ok) {
    throw new Error("Something Went Wrong!!!");
  }
  const responseData = await response.json();

  let loadedMilkRate = [];
  for (const key in responseData) {
    loadedMilkRate.push({
      id: key,
      name: responseData[key].name,
      price: responseData[key].price,
    });
  }
  return loadedMilkRate;
};

getMilkRate().then((milk) => {
  console.log(milk);
  let arr = [];
  let body = document.querySelector(`tbody`);
  let t = "";
  milk.forEach((val) => {
    t += `<tr>
      <th>${val.name}</th>
      <th>${val.price}</th>
      <th>
        <input
          class="column is-4 is-small input is-rounded is-normal is-info"
          type="text"
          placeholder="0"
          oninput="this.value=this.value.replace(/[^0-9]/g,'')"
        />
      </th>
      <th class="i_costs"></th>
    </tr>`;
    arr.push(+val.price);
  });
  console.log(arr);
  body.innerHTML = t;
  for (let i = 0; i < milk.length; i++) {
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

      for (let i = 0; i < milk.length; i++) {
        let milk = document.querySelector(
          `#milkTable > table > tbody > tr:nth-child(${
            i + 1
          }) > th:nth-child(4)`
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
});
