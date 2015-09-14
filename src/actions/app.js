export const UPDATE_TEXT_COLOR = 'UPDATE_TEXT_COLOR';
export const CORRECT_TEXT_COLOR = 'CORRECT_TEXT_COLOR';
export const UPDATE_FONT_SIZE = 'UPDATE_FONT_SIZE';
export const CORRECT_FONT_SIZE = 'CORRECT_FONT_SIZE';
export const TOGGLE_FONT_WEIGHT = 'TOGGLE_FONT_WEIGHT';
export const UPDATE_BACKGROUND_COLOR = 'UPDATE_BACKGROUND_COLOR';
export const CORRECT_BACKGROUND_COLOR = 'CORRECT_BACKGROUND_COLOR';
export const UPDATE_ACCESSIBILITY_LEVEL = 'UPDATE_ACCESSIBILITY_LEVEL';
export const LOAD_GITHUB_STARS_SUCCESS = 'LOAD_GITHUB_STARS_SUCCESS';
export const LOAD_TWITTER_COUNT_SUCCESS = 'LOAD_TWITTER_COUNT_SUCCESS';

import es6promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import jsonp from 'jsonp';
import addCommas from 'add-commas';
import { SITE_URL, REPO } from 'constants';

es6promise.polyfill(); // Required because `Promise` is undefined in IE

export function updateTextColor(field, value) {
  return {
    type: UPDATE_TEXT_COLOR,
    field,
    value
  };
}

export function correctTextColor() {
  return {
    type: CORRECT_TEXT_COLOR
  };
}

export function updateFontSize(value) {
  return {
    type: UPDATE_FONT_SIZE,
    value
  };
}

export function correctFontSize() {
  return {
    type: CORRECT_FONT_SIZE
  };
}

export function toggleFontWeight() {
  return {
    type: TOGGLE_FONT_WEIGHT
  };
}

export function updateBackgroundColor(field, value) {
  return {
    type: UPDATE_BACKGROUND_COLOR,
    field,
    value
  };
}

export function correctBackgroundColor() {
  return {
    type: CORRECT_BACKGROUND_COLOR
  };
}

export function updateAccessibilityLevel(value) {
  return {
    type: UPDATE_ACCESSIBILITY_LEVEL,
    value
  };
}

export function loadSocialCounts() {
  return dispatch => {
    // Github
    fetch(`https://api.github.com/repos/${REPO}`)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: LOAD_GITHUB_STARS_SUCCESS,
          starsCount: addCommas(response.stargazers_count)
        });
      });

    // Twitter
    window.dispatchTwitterCount = data => {
      dispatch({
        type: LOAD_TWITTER_COUNT_SUCCESS,
        count: addCommas(data.count)
      });
    };

    jsonp(`https://cdn.api.twitter.com/1/urls/count.json?callback=dispatchTwitterCount&url=${SITE_URL}`);
  };
}
