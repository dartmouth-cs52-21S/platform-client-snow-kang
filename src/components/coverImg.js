import React from 'react';

const fallbackDog = require('../img/mysteryDog.png');
const fallbackCat = require('../img/mysteryCat.png');
const fallbackTurtle = require('../img/mysteryTurtle.png');
const fallbackFish = require('../img/mysteryFish.png');
const fallbackAnimal = require('../img/mysteryAnimal.png');
const speechBubble = require('../img/speechBubble.png');
const speechBubbleFallback = require('../img/speechBubbleFallback.png');

const CoverImg = (props) => {
  let alreadyLoaded = false;

  const handleMissingImg = (e, tags) => {
    e.target.onError = null; // prevents multiple firings
    alreadyLoaded = true;
    const standardizedTags = tags ? tags.trim().toLowerCase() : tags;

    switch (standardizedTags) {
      case 'dog':
        e.target.src = fallbackDog;
        break;
      case 'cat':
        e.target.src = fallbackCat;
        break;
      case 'turtle':
        e.target.src = fallbackTurtle;
        break;
      case 'fish':
        e.target.src = fallbackFish;
        break;
      default:
        e.target.src = fallbackAnimal;
    }
  };

  const showSpeechBubble = (e) => {
    if (!alreadyLoaded) {
      e.target.onload = null;
      e.target.src = speechBubble;
    }
  };

  const showSpeechFallback = (e) => {
    e.target.onload = null;
    e.target.src = speechBubbleFallback;
    alreadyLoaded = true;
  };

  return (
    <div className={props.isEditPage ? '' : 'circular'}>
      <img src={props.srcImg}
        className="post-cover"
        alt="Post cover"
        onError={(e) => handleMissingImg(e, props.tags)}
      />
      {props.isEditPage
        ? (
          <img src={props.srcImg}
            className="speech-bubble"
            alt="Speech bubble saying pet is cute"
            onLoad={(e) => { showSpeechBubble(e); }}
            onError={(e) => { showSpeechFallback(e); }}
          />
        )
        : ''}
    </div>
  );
};

export default CoverImg;
