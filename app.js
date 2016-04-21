(function () {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', './resource.json');
    ajax.onreadystatechange = function () {
        if (ajax.readyState === ajax.DONE) {
            if (ajax.status == 200) {
                var data = JSON.parse(ajax.responseText)
                renderView(data)
            }
        }
    }
    ajax.send()
    
    var template = '\
        <li class="tasks__item">\
            <a href="{{ path }}" class="task">{{ title }}</a>\
        </li>\
    '
    
    function renderView(data) {
        var renderedView = ''
        for (var item in data) {
            if (data.hasOwnProperty(item)) {
                var renderPartial = template
                                            .replace(/(\{\{ path \}\})/, data[item].path)
                                            .replace(/(\{\{ title \}\})/, data[item].title)
                renderedView += renderPartial
            }
        }
        document.querySelector('#tasks').innerHTML = renderedView
    }
})()