import IterativeLinearMethod from "./IterativeLinearMethod";

const dot = (u, v) => u.reduce((s, ui, i) => s + ui * v[i], 0);

export default class ConjugateGradient extends IterativeLinearMethod {
  static methodName = "Conjugate Gradient";

  multiply(v) {
    return this.A.map((row) => dot(row, v));
  }

  initialize(X) {
    const AX = this.multiply(X);
    this.r = this.B.map((bi, i) => bi - AX[i]);
    this.p = [...this.r];
    this.rsold = dot(this.r, this.r);
  }

  step(X) {
    const Ap = this.multiply(this.p);
    const alpha = this.rsold / dot(this.p, Ap);
    const Xnew = X.map((xi, i) => xi + alpha * this.p[i]);
    this.r = this.r.map((ri, i) => ri - alpha * Ap[i]);

    const rsnew = dot(this.r, this.r);
    this.p = this.r.map((ri, i) => ri + (rsnew / this.rsold) * this.p[i]);
    this.rsold = rsnew;
    return Xnew;
  }

  // หยุดเมื่อ residual ||r|| เล็กกว่า eps
  hasConverged() {
    return Math.sqrt(this.rsold) < this.eps;
  }
}
