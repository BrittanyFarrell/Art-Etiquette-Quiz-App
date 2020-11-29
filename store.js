/* eslint-disable indent */
/* eslint-disable strict */

/**
 * Example store structure
 */
export const store = {
    // 5 or more questions are required
    questions: [
      {
        question: 'When taking a break from an unfinished clay project, where do you leave your work?',
        answers: [
            'On the table.',
            'In the sun.',
            'In an airtight container.',
            'In a bucket of water.'
        ],
        correctAnswer: 'In an airtight container.'
      },
      {
        question: 'When sketching with a pen,what is the best way to add shading to your work?',
        answers: [
            'Smudge the pen strokes with your finger.',
            'Shade exactly as you would with a pencil.',
            'Smudge the pen strokes with a napkin or sponge.',
            'Hatch or crosshatch shading technique.'
        ],
        correctAnswer: 'Hatch or crosshatch shading technique.'
      },
      {
        question: 'What is the ideal environment for working with spray paint?',
        answers: [
            'An enclosed area.',
            'Inside with a window open for circulation.',
            'Outdoors in an open area while wearing a mask and gloves.',
            'In a garage with the door halfway open.'
        ],
        correctAnswer: 'Outdoors in an open area while wearing a mask and gloves.'
      },
      {
        question: 'What is the difference between oil pastels and oil sticks?',
        answers: [
            'Unlike oil sticks, oil pastels never really dry.',
            'Unlike oil pastels, oil sticks never really dry.',
            'Unlike oil sticks, oil pastels are not really made with oil.',
            'Unlike oil pastels, oil sticks are not really made with oil.'
        ],
        correctAnswer: 'Unlike oil sticks, oil pastels never really dry.'
      },
      {
        question: 'When referring to images as “portrait” and “landscape”, what does “portrait” actually mean?',
        answers: [
          'A photo or painting that has more width than height.',
          'A photo or painting with at least one person.',
          'A photo or painting of a bowl of fruit.',
          'A photo or painting that has more height than width.'
        ],
        correctAnswer: 'A photo or painting that has more height than width.'
      }
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0
  };
  
  