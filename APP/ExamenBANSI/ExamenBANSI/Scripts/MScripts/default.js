function menuPrincipal() {
    $.Get('/Default/Index', { }, function (data) { $('#menuItem').html(data)});
}
