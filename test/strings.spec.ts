import {
  isAscii,
  isDigits,
  isLetters,
  endsWith,
  startsWith,
  isLetterOrDigits,
  isTrimmed,
  isUpperCase,
  isLowerCase,
  isUrl,
  isJson,
  isBase64,
} from '../src';

test('isDigits returns true for strings of digits', () => {
  const v = '123';
  expect(isDigits(v)).toBe(true);
});

test('isDigits returns false for strings with a letter', () => {
  const v = '123a';
  expect(isDigits(v)).toBe(false);
});

test('isLetters returns true for strings of letters', () => {
  const v = 'abc';
  expect(isLetters(v)).toBe(true);
});

test('isLetters returns false for strings with a number', () => {
  const v = 'abc1';
  expect(isLetters(v)).toBe(false);
});

test('isLetterOrDigits returns true for strings of letters and digits', () => {
  expect(isLetterOrDigits('abc123')).toBe(true);
});

test('isLetterOrDigits returns false for strings with other character', () => {
  expect(isLetterOrDigits('[abc]')).toBe(false);
});

test('isTrimmed returns true for trimmed strings', () => {
  expect(isTrimmed('abc 123')).toBe(true);
});

test('isTrimmed returns false for untrimmed strings', () => {
  expect(isTrimmed(' abc 123 ')).toBe(false);
  expect(isTrimmed('abc 123 ')).toBe(false);
  expect(isTrimmed(' abc 123')).toBe(false);
});

test('isLowerCase returns true for lowercase strings', () => {
  expect(isLowerCase('abc')).toBe(true);
});

test('isLowerCase returns false for mixed case strings', () => {
  expect(isLowerCase('abC')).toBe(false);
});

test('isUpperCase returns true for uppercase strings', () => {
  expect(isUpperCase('ABC')).toBe(true);
});

test('isUpperCase returns false for mixed case strings', () => {
  expect(isUpperCase('ABc')).toBe(false);
});

test('endsWith returns true for "abc" ending with "bc"', () => {
  expect(endsWith('abc', 'bc')).toBe(true);
});

test('endsWith returns false for "abc" ending with "bcd"', () => {
  expect(endsWith('abc', 'bcd')).toBe(false);
});

test('startsWith returns true for "abc" starting with "ab"', () => {
  expect(startsWith('abc', 'ab')).toBe(true);
});

test('startsWith returns false for "abc" starting with "abx"', () => {
  expect(startsWith('abc', 'abx')).toBe(false);
});

test('isAscii returns true for ascii', () => {
  expect(isAscii('abc123')).toBe(true);
});

test('isAscii returns false for other characters', () => {
  expect(isAscii('äbc')).toBe(false);
});

test('isUrl returns true for urls', () => {
  expect(isUrl('http://www.github.com')).toBe(true);
});

test('isUrl returns false for incorrect urls', () => {
  expect(isUrl('abc')).toBe(false);
});

test('isJson returns true for {"a":"b"}', () => {
  expect(isJson('{"a":"b"}')).toBe(true);
});

test('isJson returns false for "abc" ', () => {
  expect(isJson('abc')).toBe(false);
});
