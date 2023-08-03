import React, { useState } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Section from './Section';
import './Styles/App.css';

const resources = {
  emojis: [
    {
      id: 0,
      name: 'Bad',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/sad-emoji-img.png',
    },
    {
      id: 1,
      name: 'Neutral',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/none-emoji-img.png',
    },
    {
      id: 2,
      name: 'Good',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/happy-emoji-img.png',
    },
  ],
  loveEmojiUrl: 'https://assets.ccbp.in/frontend/react-js/love-emoji-img.png',
};

const App = () => {
  const [feedbackCounts, setFeedbackCounts] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleLeaveFeedback = feedbackType => {
    setFeedbackCounts(prevFeedbackCounts => ({
      ...prevFeedbackCounts,
      [feedbackType]: prevFeedbackCounts[feedbackType] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedbackCounts;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedbackCounts;
    const totalFeedback = countTotalFeedback();
    if (totalFeedback === 0) return 0;
    return Math.round((good / totalFeedback) * 100);
  };

  const feedbackOptions = Object.keys(feedbackCounts);

  return (
    <div className="bg-container">
      <div className="sub-container">
        <Section className="section-title" title="Please leave feedback">
          <FeedbackOptions
            options={feedbackOptions}
            onLeaveFeedback={handleLeaveFeedback}
            resources={resources}
          />
        </Section>
        <Section title="Feedback Statistics">
          <Statistics
            good={feedbackCounts.good}
            neutral={feedbackCounts.neutral}
            bad={feedbackCounts.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      </div>
    </div>
  );
};

export default App;
