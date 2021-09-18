export default function utf8ToXML(string) {
  let newString;
  newString = string.replaceAll('&nbsp;', ' ');
  newString = newString.replaceAll('&lt;', '<');
  newString = newString.replaceAll('&gt;', '>');
  newString = newString.replaceAll('&amp;', '&');
  newString = newString.replaceAll('&quot;', '"');
  newString = newString.replaceAll('&apos;', "'");
  return newString;
}
