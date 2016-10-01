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

const knnIntro = `There are two distinct algorithms under the hood that power Consilium;
they both belong to the class of collaborative filtering. The first one is a type of
lazy learning algorithm, called k-Nearest-Neighbor. Here's the idea:` ;

const knnIdea = `Imagine you are shopping for a pair of new shoes. There are many
options and they are all seemingly trendy. You are having a hard time to decide
which color and which style to go with. Question is, who do you seek for help
as a second pair of eyes? You'd ask people who share similar taste and preference with
you because chance is, if they like something you will also like it. This is known as
collaborative filtering`;

const svdIntro = `The other algorithm we used is sparse matrix SVD (Singular Value Decomposition.)
Imagine that movie rating is in fact a giant matrix, with rows being users and columns being
movies. Every matrix element is a movie rating on movie j from user i.`;

const principalComponents = ` Some components are less important that others.
How do we tell? Given a completely filled matrix, we can perform SVD on it directly and
look at the weights. The weights are generally concentrated in the top left corner of the
scaling matrix in the middle. This is because there are many redundant information in the
full vector space. We can in fact summarize those information using less space and less component,
which means less features. In fact, this is the fundamental idea of principal component
analysis (PCA.) Standard SVD does not work on a sparse matrix so we need function
optimization technique to come to rescue.`;

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

    let ratingMatrix = `R =
    \\begin{bmatrix}
    r_{user_{1},movie_{1}} & r_{user_{1}, movie_{2}} & r_{user_{1}, movie_{3}}
    & ... & r_{user_{1}, movie_{m}}\\\\
    r_{user_{2},movie_{1}} & r_{user_{2}, movie_{2}} & r_{user_{2}, movie_{3}}
    & ... & r_{user_{2}, movie_{m}}\\\\
    r_{user_{3},movie_{1}} & r_{user_{3}, movie_{2}} & r_{user_{3}, movie_{3}}
    & ... & r_{user_{3}, movie_{m}}\\\\
    ... & ... & ... & ... & ... \\\\
    r_{user_{N}, movie_{1}} & r_{user_{N}, movie_{2}} & r_{user_{N}, movie_{3}}
    & ... & r_{user_{N}, movie_{m}}
    \\end{bmatrix}`;
    this.renderKatex("rating-matrix", ratingMatrix);

    let sparseMatrix = `R_{sparse} =
    \\begin{bmatrix}
    r_{1,1} & r_{1,2} & ??? & r_{1,4} & ??? \\\\
    r_{2,1} & ??? & r_{2,3} & r_{2,4} & r_{2,5} \\\\
    r_{3,1} & r_{3,2} & r_{3,3} & r_{3,4} & r_{3,5} \\\\
    r_{4,1} & r_{4,2} & r_{4,3} & ??? & r_{4,5} \\\\
    r_{5,1} & ??? & r_{5,3} & r_{5,4} & r_{5,5}
    \\end{bmatrix}`;
    this.renderKatex("sparse-matrix", sparseMatrix);

    let decomposeMatrix = `R =
    \\begin{bmatrix}
    \\theta_{user_{1},1} & \\theta_{user_{1},2} & \\theta_{user_{1},3} &
    \\theta_{user_{1},4} & \\theta_{user_{1},5}\\\\
    \\theta_{user_{2},1} & \\theta_{user_{2},2} & \\theta_{user_{2},3} &
    \\theta_{user_{2},4} & \\theta_{user_{2},5}\\\\
    \\theta_{user_{3},1} & \\theta_{user_{3},2} & \\theta_{user_{3},3} &
    \\theta_{user_{3},4} & \\theta_{user_{3},5}\\\\
    \\theta_{user_{4},1} & \\theta_{user_{4},2} & \\theta_{user_{4},3} &
    \\theta_{user_{4},4} & \\theta_{user_{4},5}\\\\
    \\theta_{user_{5},1} & \\theta_{user_{5},2} & \\theta_{user_{5},3} &
    \\theta_{user_{5},4} & \\theta_{user_{5},5}
    \\end{bmatrix}
    \\times
    \\begin{bmatrix}
    \\lambda_{1} & 0 & 0 & 0 & 0 \\\\
    0 & \\lambda_{2} & 0 & 0 & 0 \\\\
    0 & 0 & \\lambda_{3} & 0 & 0 \\\\
    0 & 0 & 0 & \\lambda_{4} & 0 \\\\
    0 & 0 & 0 & 0 & \\lambda_{5}
    \\end{bmatrix}
    \\times
    \\begin{bmatrix}
    f_{1, movie_{1}} & f_{1, movie_{2}} & f_{1, movie_{3}} & f_{1, movie_{4}} & f_{1, movie_{5}}\\\\
    f_{2, movie_{1}} & f_{2, movie_{2}} & f_{2, movie_{3}} & f_{2, movie_{4}} & f_{2, movie_{5}}\\\\
    f_{3, movie_{1}} & f_{3, movie_{2}} & f_{3, movie_{3}} & f_{3, movie_{4}} & f_{3, movie_{5}}\\\\
    f_{4, movie_{1}} & f_{4, movie_{2}} & f_{4, movie_{3}} & f_{4, movie_{4}} & f_{4, movie_{5}}\\\\
    f_{5, movie_{1}} & f_{5, movie_{2}} & f_{5, movie_{3}} & f_{5, movie_{4}} & f_{5, movie_{5}}
    \\end{bmatrix}`;
    this.renderKatex("decompose-matrix", decomposeMatrix);

    let dimension = `N \\times M = (N \\times p)(p \\times f)(f \\times m)`;
    this.renderKatex("dimension", dimension);

    let linearCombo = `R_{i,j} =
    \\theta_{i, 1}\\lambda_{1} f_{1, j} + \\theta_{i, 2}\\lambda_{2} f_{2, j} +
    \\theta_{i, 3}\\lambda_{3} f_{3, j} + ... + \\theta_{i, n}\\lambda_{n} f_{n,j}`;
    this.renderKatex("linear-combo", linearCombo);

    let costFunction = `J(f^{(1)}, f^{(2)}, f^{(3)}, ..., f^{(m)},
    \\theta^{(1)}, \\theta^{(2)}, \\theta^{(3)}, ..., \\theta^{(N)}) =
    \\frac{1}{2}\\sum_{i, j \\in R} (\\theta^{(j)}f^{(i)} - r^{(i,j)})^{2} +
    \\frac{\\lambda}{2}\\sum_{i}^{m}\\sum_{k}^{n} (f_{k}^{(i)})^{2} +
    \\frac{\\lambda}{2}\\sum_{j}^{N}\\sum_{k}^{n} (\\theta_{k}^{(j)})^{2}`;
    this.renderKatex("cost-function", costFunction);

    let objective = `Objective:\\,minimize\\,J\\,with\\,respect\\,to\\:\\Theta,\\:F`;
    this.renderKatex("objective", objective);

    let bigTheta = `\\Theta = {\\theta^{(1)}, \\theta^{(2)}, \\theta^{(3)}, ..., \\theta^{(N)}} \\:
    F = {f^{(1)}, f^{(2)}, f^{(3)}, ..., f^{(m)}}`;
    this.renderKatex("big-theta", bigTheta);

    let djDf = `f_{k}^{(i)} := f_{k}^{(i)} - \\alpha \\frac{\\partial J}{\\partial f_{k}^{(i)}}`;
    this.renderKatex("dj-df", djDf);

    let djDtheta = `\\theta_{k}^{(i)} := \\theta_{k}^{(i)} -
    \\alpha \\frac{\\partial J}{\\partial \\theta_{k}^{(i)}}`;
    this.renderKatex("dj-dtheta", djDtheta);
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
          <p>{knnIntro}</p>
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
          <p>{svdIntro}</p>
          <blockquote>
            <p id="rating-matrix"></p>
          </blockquote>
          <p>
            However, the matrix is sparse, that is, many elements are missing. Not everyone
            has seen every movie humankind has produced. It is the job of a recommender
            system to fill in the missing values. Those missing values are in fact the predictions
            of a machine learning model. If the prediction gives a high star rating to
            R<sub>i,j</sub> then we recommend movie<sub>j</sub> to user<sub>i</sub>
        </p>
        <blockquote>
          <p id="sparse-matrix"></p>
        </blockquote>
        <h4>Singular Value Decomposition</h4>
        <p>
          SVD is a very powerful dimensionality reduction technique in linear algebra.
          The common use of SVD is to perform principal component analysis.
          It dissects a matrix into sub-components and figures out which component
          conveys the most information about the matrix and then drop all the unnecessary
          information. Imagine we have 5 users and 5 movies, this is what a SVD
          would look like:
        </p>
        <blockquote>
          <p id="decompose-matrix"></p>
          <p id="dimension"></p>
          <p>
            N is the number of users, p is the dimension of user preference, f is the dimension
            of movie feature, and m is the number of movies
          </p>
        </blockquote>
        <p>
          What we have done here is factorized a matrix into subcomponents. Perhaps the more
          intuitive way to see it is that we have factorized movie rating into a dot product
          of user preference vector and movie feature vector.
        </p>
        <blockquote>
          <p>
            Essentially every movie rating is a linear combination of preference, feature,
            and weights. (n: number of features)
          </p>
          <p id="linear-combo"></p>
        </blockquote>
        <p>
          {principalComponents}
        </p>
        <blockquote>
          <p id="cost-function"></p>
          <p id="objective"></p>
          <p id="big-theta"></p>
        </blockquote>
        <p>
          {`We perform gradient descent on cost function and effectively learning preference
          and feature vectors for every user and movie in our database.`}
        </p>
        <blockquote>
          <p id="dj-df"></p>
          <p id="dj-dtheta"></p>
        </blockquote>
      </section>
    </article>
  );
}
});

module.exports = About;
