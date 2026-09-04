# 🧬 Question DNA & Mathematical Scoring Specification

## 1. Dimensional Vectors
Every discovered question $\mathbf{Q}$ is assigned an 8-dimensional attribute vector $\mathbf{v} \in [0, 100]^8$:

$$\mathbf{v} = \begin{bmatrix}
\text{Originality} \\
\text{Importance} \\
\text{Future Impact} \\
\text{Research Potential} \\
\text{Innovation Potential} \\
\text{Urgency} \\
\text{Feasibility} \\
\text{Human Impact}
\end{bmatrix}$$

## 2. Weight Coefficients
* $w_{\text{orig}} = 0.20$
* $w_{\text{imp}} = 0.20$
* $w_{\text{fut}} = 0.15$
* $w_{\text{res}} = 0.15$
* $w_{\text{inn}} = 0.10$
* $w_{\text{urg}} = 0.08$
* $w_{\text{feas}} = 0.05$
* $w_{\text{hum}} = 0.07$

## 3. Harmonic Curiosity Score Formula
$$\text{Score}(\mathbf{Q}) = \min\left(99, \text{round}\left(\sum_{i=1}^{8} w_i v_i + \delta(\mathbf{v})\right)\right)$$

Where $\delta(\mathbf{v}) = 2.5$ if $v_{\text{orig}} \ge 90 \land v_{\text{fut}} \ge 90$, otherwise $0.0$.
