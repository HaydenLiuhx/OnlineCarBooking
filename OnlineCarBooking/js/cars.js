// Use AJAX to load the XML file "cars.xml"
$(document).ready(function () {
    car_array = [];
    selectedCars = [];
    
    // car_array.length = 0;
    // selectedCars.length = 0;
    
    $.ajax({
        type: "GET",
        url: "xml/cars.xml",
        dataType: "xml",
        success: xmlParser
    });

});



function xmlParser(xml) {

    $(xml).find("car").each(function () {
        //console.log($(this).find("ProductID").text());
        let productID = $(this)
            .find("id").text();
        let category = $(this)
            .find("category").text();
        let brand = $(this)
            .find("brand").text();
        let model = $(this)
            .find("model").text();
        let modelYear = $(this)
            .find("model_year").text();
        let mileage = $(this)
            .find("mileage").text();
        let fuelType = $(this)
            .find("fuel_type").text();
        let seats = $(this)
            .find("seats").text();
        let pricePerDay = $(this)
            .find("price_per_day").text();
        let description = $(this)
            .find("description").text();
        let availability = $(this)
            .find("availability").text();

        car = {
            id: productID,
            category: category,
            brand: brand,
            model: model,
            model_year: modelYear,
            mileage: mileage,
            fuel_type: fuelType,
            seats: seats,
            price_per_day: pricePerDay,
            description: description,
            availability: availability
        };

        car_array.push(car);
    });

    showContent();

}

// Present content to main page
function showContent() {
    for (let i = 0; i < car_array.length; i++) {

        var category;

        var productBox = $("<div></div>").addClass("product-box");
        var saleTag = $("<span></span>").addClass("sale_tag");  // Create with jQuery               
        productBox.append(saleTag);

        var category = $('<img>');
        var url = "assets/images/" + car_array[i].model + ".jpg";
        category.attr('src', url);
        category.attr('alt', "images");
        category.attr('style', "width:100%; height:250px;");
        productBox.append(category);

        // title
        category = $("<a></a>").addClass("title").text(car_array[i].brand + "-" + car_array[i].model + "-" + car_array[i].model_year);
        productBox.append(category);
        productBox.append($("<br></br>"));

        // Mileage
        category = $("<a></a>").addClass("category").text("Mileage: " + car_array[i].mileage + " kms");
        productBox.append(category);
        productBox.append($("<br></br>"));

        // Fule Type
        category = $("<a></a>").addClass("category").text("Fuel Type: " + car_array[i].fuel_type);
        productBox.append(category);
        productBox.append($("<br></br>"));

        // Seats
        category = $("<a></a>").addClass("category").text("Seats: " + car_array[i].seats);
        productBox.append(category);
        productBox.append($("<br></br>"));

        // Price per day
        category = $("<a></a>").addClass("category").text("Price Per Day: $" + car_array[i].price_per_day);
        productBox.append(category);
        productBox.append($("<br></br>"));

        // Availability
        category = $("<a></a>").addClass("category").text("Availability: " + car_array[i].availability);
        productBox.append(category);
        productBox.append($("<br></br>"));

        // Description
        category = $("<p></p>").addClass("description").text("Availability: " + car_array[i].description);
        productBox.append(category);
        productBox.append($("<br></br>"));

        // Button
        var button = $("<button></button>").addClass("btn btn-inverse").text("Add to cart");
        button.click({ id: car_array[i].id }, checkAvailability);
        productBox.append(button);
        productBox.append($("<br></br>"));

        var li = $("<li></li>").addClass("span3");
        li.append(productBox);
        $("#products").append(li);

    }

}

function filterArray(arr) {
    let unique_arr = arr.filter(function (element, index, self) {
        return index == self.indexOf(element);
    });
    return unique_arr
}

function checkAvailability(event) {

    $.ajax({
        type: "GET",
        url: "xml/cars.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml)
                .find("car")
                .each(function () {
                    let productID = $(this)
                        .find("id").text();;
                        //console.log(event.data.id);
                    if (productID == event.data.id) {
                        let availability = $(this)
                            .find("availability").text();
                        console.log(availability);
                        if (availability == "True") {
                            //selectedCars.push(productID);
                            //console.log($.session.get("selectedCars"));
                            if ($.session.get("selectedCars") == undefined) {
                                selectedCars.push(event.data.id);
                                var unique = filterArray(selectedCars);
                                //转化为JSON
                                $.session.set("selectedCars", JSON.stringify(unique));

                            } else {
                                //解析JSON
                                selectedCars = JSON.parse($.session.get("selectedCars"));//no brackets
                                selectedCars.push(event.data.id);
                                var unique = filterArray(selectedCars);//[...new Set(names)];
                                $.session.set("selectedCars", JSON.stringify(unique));
                            }

                            alert("Add to cart successfully");

                        } else {
                            alert("Sorry It is not available.");
                        }
                        return;

                    }
                });

        },
        error: function () {
            alert("An error occurred while processing XML file.");
        }
    });
}
