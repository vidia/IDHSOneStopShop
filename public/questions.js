var data = { title:
    'Survey',
  questions:
    ['moo','moo23','moo3']
}
var html = new EJS({url: 'survey.ejs'}).render(data);
document.getElementById('questions').innerHTML = html;
