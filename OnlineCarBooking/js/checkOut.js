$(document).ready(function () {

    car_array = [];
    //console.log($.session.get("selectedCars").length );
    //console.log(selectedCars.length);
    
    selectedCars = JSON.parse($.session.get("selectedCars"));
    //console.log(selectedCars.length);
    if (selectedCars.length !== 0)  {
        
var popUp = document.getElementById("info-banner");
      popUp.style.display = "none";
    }
    
    $.ajax({
        type: "GET",
        url: "xml/cars.xml",
        dataType: "xml",
        success: xmlParser,
        error: function () {
            alert("An error occurred while processing XML file.");
        }
    });

    $('#checkout').click(function (e) {
        var overAllMoney = 0;
        let jump = true;
        var products = [];
        selectedCars = JSON.parse($.session.get("selectedCars"));
        console.log(selectedCars.length);
        if (selectedCars <= 0) {
            alert("No car has been reserved");
            window.location.href = 'index.html';
        } else {
            // VAlidate rental days  
            for (let i = 0; i < selectedCars.length; i++) {

                var product;
                var id = "#" + selectedCars[i];
                if ($(id).val() <= 0) {
                    alert("Rental dyas must be greater than 1");
                    jump = false;
                }
                else {
                    for (let j = 0; j < car_array.length; j++) {
                        if (selectedCars[i] == car_array[j].id) {
                            overAllMoney += $(id).val() * car_array[j].price_per_day;

                            product = {
                                id: selectedCars[i],
                                quantity: $(id).val()
                            }
                            products.push(product);
                        }
                    }
                }

                $.session.set("overAllMoney", JSON.stringify(overAllMoney));
                $.session.set("products", JSON.stringify(products));
            }
            $.session.set("overAllMoney", JSON.stringify(overAllMoney));
            //console.log(overAllMoney);

            if (jump == true)
                window.location.href = "form.html";
        }


    })
});

function handle() {
    console.log(selectedCars);
    console.log(car_array);
    for (let i = 0; i < selectedCars.length; i++) {
        for (let j = 0; j < car_array.length; j++) {
            // const element = array[index];
            if (selectedCars[i] == car_array[j].id) {

                var category;
                var tr = $("<tr></tr>");
                var td = $("<td></td>");
                tr.append(td);

                category = $('<img>');
                var url = "assets/images/" + car_array[j].model + ".jpg";
                category.attr('src', url);
                category.attr('alt', "images");
                category.attr('style', "width:200x; height:300px;");
                td.append(category);

                td = $("<td></td>");
                tr.append(td);
                category = $('<div></div>').text(car_array[j].model_year + "-" + car_array[j].brand + "-" + car_array[j].model);
                td.append(category);

                // Rental days
                td = $("<td></td>");
                tr.append(td);
                category = $('<input></input>').addClass("input-mini");
                category.attr('type', "text");
                category.attr('id', car_array[j].id);
                category.val("1");
                td.append(category);

                // Unit Price
                td = $("<td></td>").text("$" + car_array[j].price_per_day);
                tr.append(td);

                // Delete Button
                td = $("<td></td>");
                tr.append(td);
                category = $('<button></button>').addClass("btn btn-danger").text("Delete");
                category.click({ id: car_array[j].id }, deleteCar);
                td.append(category);

                $("#tbody").append(tr);
                continue;
            }

        }

    }

}

function deleteCar(event) {
    var index = selectedCars.indexOf(event.data.id);
    if (index > -1) {
        selectedCars.splice(index, 1);
    }
    $.session.set("selectedCars", JSON.stringify(selectedCars));
    //$.redirect('cart.php', { 'arg1': selectedCars });
    location.reload();
}

function xmlParser(xml) {

    $(xml).find("car").each(function () {
        // console.log($(this).find("ProductID").text());
        let productID = $(this)
            .find("id")
            .text();
        let category = $(this)
            .find("category")
            .text();
        let availability = $(this)
            .find("availability")
            .text();
        let brand = $(this)
            .find("brand")
            .text();
        let model = $(this)
            .find("model")
            .text();
        let modelYear = $(this)
            .find("model_year")
            .text();
        let mileage = $(this)
            .find("mileage")
            .text();
        let fuelType = $(this)
            .find("fuel_type")
            .text();
        let seats = $(this)
            .find("seats")
            .text();
        let pricePerDay = $(this)
            .find("price_per_day")
            .text();

        car = {
            id: productID,
            category: category,
            availability: availability,
            brand: brand,
            model: model,
            model_year: modelYear,
            mileage: mileage,
            fuel_type: fuelType,
            seats: seats,
            price_per_day: pricePerDay,
        };

        car_array.push(car);
    });

    handle();
}