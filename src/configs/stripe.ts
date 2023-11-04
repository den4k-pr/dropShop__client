import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStipePromise = () => {
  const key = "pk_live_51MfrTsBUu2QbkaK8nrzxcECfZYe6vXuC6FDVbA2zRo8ubkq9mzs3Y7M6ovGtwOVGXxxc0uyb28jpGfoq1wBu85S40022pzXwGX";

  if (!stripePromise && !!key) {
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export default getStipePromise;