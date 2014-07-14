import flask

app = flask.Flask(__name__)

### ROUTES
@app.route('/')
def index():
	return flask.redirect("/static/index.html")

@app.route('/index')
def redirects():
	return flask.redirect('/')

@app.route("/favicon.ico")
def favicon():
	return flask.redirect("/static/favicon.ico")

if __name__ == "__main__":
	app.run(debug=True)
