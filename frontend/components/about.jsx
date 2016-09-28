const React = require('react');
const FormGroup = require('react-bootstrap').FormGroup;
const FormControl = require('react-bootstrap').FormControl;
const ControlLabel = require('react-bootstrap').ControlLabel;
const HelpBlock = require('react-bootstrap').HelpBlock;

/* global katex */
const About = React.createClass({

  // contextTypes: {
  //   router: React.PropTypes.object.isRequired
  // },
  //
  // handleClick: function(event) {
  //   event.preventDefault();
  //   this.context.router.replace("/");
  // },

  getInitialState() {
    return {value: ''};
  },

  componentWillMount() {
    $.ajax({
      url: "/api/recommender/recommendations",
      dataType: "JSON",
      method: "GET",
      data: {
        recommender: {
          rated: {
            1: 5,
            91500: 3.5,
            91529: 3,
            98809: 2.5,
            99114: 5,
            106782: 4.5,
            109487: 4.5,
            112552: 3.5,
            480: 5,
            519: 2.5,
            527: 5,
            541: 5,
            587: 3
          },
          queue: {
            2: true,
            4: true,
            125: true
          }
        }
      },
      success: function(data) {
        debugger;
      },
      error: function(data) {
        console.log(data.responseJSON.errors);
      }
    });
  },

  componentDidMount() {
    let ratingAggregation = "r_{u,i} = \\bar{r}_{u} +k \\sum_{u' \\in N} sim(u, u') r_{u', i}";
    this.renderKatex("rating-prediction", ratingAggregation);

    let kFactor = "k = (\\sum_{u' \\in N} \\left | sim(u, u') \\right |)^{-1}";
    this.renderKatex("normalization", kFactor);

    let simCoeff = "sim(u, v) = C^{-1}\\sum_{i\\in I_{u} \\cap I_{v}}(r_{u, i} - \\bar{r}_u)";
    simCoeff += "\\sum_{i\\in I_{u}\\cap I_{v}}(r_{v,i} - \\bar{r}_v)";
    this.renderKatex("user-sim", simCoeff);

    let simNorm = "C = \\sqrt{\\sum_{i\\in I_{u}\\cap I_{v}}(r_{u,i} - \\bar{r}_u)^{2}";
    simNorm += "\\sum_{i\\in I_{u}\\cap I_{v}}(r_{v,i} - \\bar{r}_v)^{2}}";
    this.renderKatex("sim-norm", simNorm);
  },

  renderKatex(elementId, mathExpression) {
    let element = $(`#${elementId}`)[0];
    katex.render(mathExpression, element);
  },

  render: function() {
    return (
      <div className="page-container">
        <h1>About Consilium</h1>
        <p>
          We have built a movie recommender system using Rails and React.js.
          The backend does not use traditional relational database like PostgreSQL.
          Instead it uses Redis as a key value store. Traditional relational database
          depends heavily on joins and it becomes inefficient as the table gets
          large.
        </p>
        <p>
          The full data set has 250,000 users and 22 million ratings on 30,000 movies.
          We use collaborative filtering to produce movie recommmendations. We implemented
          a k-Nearest-Neighbor algorithm to compute movie rating predictions.
        </p>
        <p>Rating Prediction for User u on Item i</p>
        <div id="rating-prediction"></div>
        <p><strong>k</strong> is a normalization constant</p>
        <div id="normalization"></div>
        <p>We compute user similarity using Pearson coefficient</p>
        <div id="user-sim"></div>
        <p><strong>C</strong> is the correlation normalization constant</p>
        <div id="sim-norm"></div>

      </div>
    );
  }
});

module.exports = About;
