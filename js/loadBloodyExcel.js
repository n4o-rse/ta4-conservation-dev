var phoneButton = document.getElementById('phone');
  var smsButton = document.getElementById('sms');
  var workbook = null;


  function downloadCSV(e) {
    console.log(e);
    /* DO SOMETHING WITH workbook HERE */
    var first_sheet_name = workbook.SheetNames[e];
    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name];

    var rows = XLSX.utils.sheet_to_json(worksheet, {
      raw: true
    });
    const items = rows;
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))
    csv = csv.join('\r\n');
    let csvContent = "data:text/csv;charset=utf-8," + csv;


    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", (e === 0 ? "Phone numbers coverage" : "SMS Coverage") + ".csv");
    document.body.appendChild(link); // Required for FF
    link.click();
    document.removeChild(link);
  }

  function getSheet() {
    /* set up XMLHttpRequest */
    var url = "https://plivo_blog_uploads.s3.amazonaws.com/plivo_coverage_xlsx.xlsx";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function (e) {
      var arraybuffer = oReq.response;

      /* convert data to binary string */
      var data = new Uint8Array(arraybuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");

      /* Call XLSX */
      workbook = XLSX.read(bstr, {
        type: "binary"
      });

      smsButton.disabled = false;
      phoneButton.disabled = false;
    }

    oReq.send();
  }

  getSheet();