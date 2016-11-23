import $ from 'jquery';

function deleteitem() {
  const thisid = $(this)[0].dataset.itemid;
  $.ajax({
    type: 'DELETE',
    url: `https://a25avadb82.execute-api.us-east-1.amazonaws.com/dev/items/${thisid}`,
    success: () => {
      location.reload();
    },
    error: (error) => {
      console.log(error);
    },
  });
}

function additem(event) {
  const formdata = {
    itemname: $('input[name=itemname]').val(),
    itemdescription: $('input[name=itemdescription]').val(),
    itemurl: $('input[name=itemurl]').val(),
  };
  console.log(formdata);
  $.ajax({
    type: 'POST',
    url: 'https://a25avadb82.execute-api.us-east-1.amazonaws.com/dev/items',
    data: JSON.stringify(formdata),
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: () => {
      location.reload();
    },
    error: (error) => {
      console.log(error);
    },
  });
  event.preventDefault();
}

$(() => {
  $('#submit').click(additem);

  $.ajax({
    type: 'GET',
    url: 'https://a25avadb82.execute-api.us-east-1.amazonaws.com/dev/items/',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    success: (data) => {
      for (const item of data.items) {
        const url = `http://${item.url.S}`;
        const nameurl = `<td><a href="${url}" target=_blank>${item.name.S}</a></td>`;
        const description = `<td>${item.description.S}</td>`;
        const purchasebutton = `<td><button id="purchase-${item.id.S}">Purchased</button></td>`;
        const deletebutton = `<td><button id="delete-${item.id.S}" data-itemid="${item.id.S}">Delete</button></td>`;
        $(`<tr>${nameurl}${description}${purchasebutton}${deletebutton}</tr>`)
            .appendTo('#items');
        $(`#delete-${item.id.S}`).click(deleteitem);
      }
    },
    error: (error) => {
      console.log(error);
    },
  });
});
