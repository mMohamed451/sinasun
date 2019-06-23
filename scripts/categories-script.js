$('.navTrigger').click(() => {
    $(this).toggleClass('active');
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();
});

var xhr = new XMLHttpRequest();
(function MyFunc() {

    xhr.open('GET', `http://0539e531.ngrok.io/getproductswithouttoken`, true);
    xhr.onload =  () => {
        const response = JSON.parse(xhr.response);
        console.log('response', response);
        response.forEach(element => {
            document.getElementById('test').innerHTML +=
                `          
                            <div class="${element.category}">
                                <div>
                                <img class="product-image" src="../backend/public/uploads/${element.url}" alt="">
                                </div>

                            
                                <h6 ><a href="single.html">${element.name}</a></h6>
                         </div>
`;
        });
    }

    xhr.send();

})();

function sortedWithCategoryHoney() {
    $('.OLIVES').hide();
    $('.DATES').hide();
    $('.HONEY').show();
    $('.OTHERS').hide();


}

function sortedWithCategoryDates() {
    $('.OLIVES').hide();
    $('.HONEY').hide();
    $('.DATES').show();
    $('.OTHERS').hide();


}

function sortedWithCategoryPickledOils() {
    $('.DATES').hide();
    $('.HONEY').hide();
    $('.OLIVES').show();
    $('.OTHERS').hide();


}

function showAll() {
    $('.DATES').show();
    $('.HONEY').show();
    $('.OLIVES').show();
    $('.OTHERS').show();

}

function sortedWithCategoryOthers() {
    $('.DATES').hide();
    $('.HONEY').hide();
    $('.OLIVES').hide();
    $('.OTHERS').show();
}