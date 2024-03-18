import { useEffect, useState } from "react";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

const initialReviews = {
  good: 0,
  neutral: 0,
  bad: 0,
};

function App() {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("savedReviews");
    const parsedReviews = JSON.parse(savedReviews) ?? initialReviews;
    return parsedReviews;
  });

  useEffect(() => {
    localStorage.setItem("savedReviews", JSON.stringify(reviews));
  }, [reviews]);

  const updateFeedback = (feedbackType) => {
    setReviews({ ...reviews, [feedbackType]: reviews[feedbackType] + 1 });
  };

  const totalFeedback = reviews.good + reviews.neutral + reviews.bad;

  const resetReviews = () => {
    setReviews({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const positiveReviews = Math.round(
    ((reviews.good + reviews.neutral) / totalFeedback) * 100
  );

  return (
    <div className="feedback-container">
      <Description />
      {totalFeedback === 0 ? (
        <>
          <Options updateFeedback={updateFeedback} />
          <Notification />
        </>
      ) : (
        <div>
          <Options
            updateFeedback={updateFeedback}
            totalFeedback={totalFeedback}
            resetReviews={resetReviews}
          />
          <Feedback
            reviews={reviews}
            totalFeedback={totalFeedback}
            positiveReviews={positiveReviews}
          />
        </div>
      )}
    </div>
  );
}

export default App;
