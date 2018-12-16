from japronto import Application
from math_service.add import add

def hello(request):
  print(request.query.get('paper'))
  print(request.match_dict.get('login'))
  print('add is {}'.format(add(1, 2)))
  return request.Response(json={'query': request.query_string})

app = Application()
app.router.add_route('/{login}', hello, 'GET')
app.run(debug=True)