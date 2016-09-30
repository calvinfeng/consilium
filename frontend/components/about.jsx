const React = require('react');
const Gist = require('./gist.jsx');

const introduction = `Consilium is a movie recommender system. It utilizes
huge data set and user input to perform machine learning. The goal of
Consilium is to learn user's preference and to provide accurate recommendations
that are tailored specifically to user's taste. Users are asked to rate a couple
of movies they have seen before. We called this the gauge set; we are trying to
measure and perform learning on user's taste and preference. The gauge set
will be sent to the backend and the server will perform learning.`;

const techStack = `Consilium's backend runs on Ruby on Rails with PostgreSQL and
Redis K-V store. Rails performs in-memory caching through its MemoryStore and on Redis server.
The frontend is written in React.js using Flux architectural pattern for managing incoming
and outgoing data on client side. The machine learning algorithm is written in Ruby and
Python. For SVD matrix factorization and machine learning, we peform computation offline
and update the data set online periodically. The offline computation code is written in Python`;

const knn = `There are two distinct algorithms under the hood that power Consilium;
they both belong to the class of collaborative filtering. The first one is a type of
lazy learning algorithm, called k-Nearest-Neighbor. Here's the idea:` ;

const knnIdea = `Imagine you are shopping for a pair of new shoes. There are many
options and they are all seemingly trendy. You are having a hard time to decide
which color and which style to go with. Question is, who do you seek for help
as a second pair of eyes? You'd ask people who share similar taste and preference with
you because chance is, if they like something you will also like it. This is known as
collaborative filtering`;

/* global katex */
const About = React.createClass({

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
      <article className="page-container">
        <h1 id="about-page-title">About Consilium</h1>

        <section>
          <h4>Brief Introduction</h4>
          <p>{introduction}</p>
          <h4>Tech Stack</h4>
          <p>{techStack}</p>
        </section>

        <section>
          <h3>k-Nearest-Neighbor</h3>
          <p>{knn}</p>
          <blockquote>{knnIdea}</blockquote>
          <h4>Mathematical Formulation</h4>
          <p>
            First of all, we need to quantify how similar are the preferences
            of two users. The metric we are using is Pearson coefficient. It gives
            a value from -1 to 1, with 1 means two users are strongly positively
            correlated while -1 means two users are strongly negatively correlated.
          </p>
          <blockquote>
            <p>
              I<sub>u</sub> is the set of movies that user <strong>u</strong> has seen and
              I<sub>v</sub> is the set of movies that user <strong>v</strong> has seen. The notation
              is saying that iterate through the set of movies that both users have seen.
            </p>
            <div id="user-sim"></div>
            <p><strong>C</strong> is the correlation normalization constant</p>
            <div id="sim-norm"></div>
          </blockquote>
          <Gist id="e537728e8f09973e531266aead0960f3"/>
          <p>
            Once we know how similar two users are, we then can select the most similar
            users and use them as a reference for opinions. Similarity is serving
            as a statistical weight. It allows us to compute the collaborative opinions
            of users.
          </p>
          <blockquote>
            <p>Rating Prediction for User u on Item i</p>
            <div id="rating-prediction"></div>
            <p><strong>k</strong> is a normalization constant</p>
            <div id="normalization"></div>
          </blockquote>
          <Gist id="b6582806f01d6ec51d72b9d5408c214a"/>
          <p>
            This implementation does not take in a constant k number of neighbors.
            It fluctuates depending on movie viewers size. We had trouble fitting
            the whole data set in memory so this approach was to sacrifice accuracy
            for speed.
          </p>
        </section>

        <section>
          <h3>Sparse Matrix SVD</h3>
        </section>


      </article>
    );
  }
});

module.exports = About;
