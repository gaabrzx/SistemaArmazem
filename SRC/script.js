const itemForm = document.getElementById("itemForm");
const itemTableBody = document.getElementById("itemTableBody");

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

itemForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const itemName = document.getElementById("itemName").value;
  const itemPrice = parseFloat(document.getElementById("itemPrice").value);
  const itemQuantity = document.getElementById("itemQuantity").value;

  const formattedPrice = formatter.format(itemPrice);

  const row = document.createElement("tr");

  row.innerHTML = `
                                        <td>${itemName}</td>
                                        <td>${formattedPrice}</td>
                                        <td>${itemQuantity}</td>
                                        <td>
                                                <button class="sell-button" onclick="sellItem(this)">Vender</button>
                                        </td>
                                `;

  itemTableBody.appendChild(row);

  itemForm.reset();
});

function sellItem(button) {
  const row = button.parentElement.parentElement;
  const quantityCell = row.children[2];
  let quantity = parseInt(quantityCell.textContent);

  const sellQuantity = parseInt(
    prompt("Digite a quantidade para vender:", "1")
  );

  if (isNaN(sellQuantity) || sellQuantity <= 0) {
    alert("Quantidade inválida!");
    return;
  }

  if (sellQuantity > quantity) {
    alert("Estoque insuficiente!");
    return;
  }

  quantity -= sellQuantity;
  if (quantity === 0) {
    row.remove();
  } else {
    quantityCell.textContent = quantity;
  }
}
