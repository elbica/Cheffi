import { ViewStyle } from 'react-native';
import { Colors } from 'styled-components';

export const likeText: likeTextElement[] = [
  {
    text: '에그 샌드위치',
    radius: 70,
    color: 'vegetable',
    styles: { top: '60px', left: '-10px' },
  },
  {
    text: '미역국',
    radius: 45,
    color: 'citrus',
    styles: { top: '140px', left: '130px' },
  },
  {
    text: '',
    radius: 18,
    color: 'carrot',
    styles: { top: '70px', left: '140px' },
  },
  {
    text: '비프 스테이크',
    radius: 70,
    color: 'deepYellow',
    styles: { top: '10px', left: '190px' },
  },
  {
    text: '',
    radius: 12,
    color: 'carrot',
    styles: { top: '40px', left: '340px' },
  },
  {
    text: '김치찌개',
    radius: 50,
    color: 'vegetable',
    styles: { top: '160px', left: '275px' },
  },
  {
    text: '통삼겹 구이',
    radius: 60,
    color: 'carrot',
    styles: { top: '60px', left: '350px' },
  },
  {
    text: '',
    radius: 20,
    color: 'tableGray',
    styles: { top: '55px', left: '475px' },
  },
  {
    text: '계란말이',
    radius: 50,
    color: 'vegetable',
    styles: { top: '110px', left: '480px' },
  },
  {
    text: '짬뽕',
    radius: 40,
    color: 'carrot',
    styles: { top: '215px', left: '25px' },
  },
  {
    text: '',
    radius: 10,
    color: 'citrus',
    styles: { top: '210px', left: '105px' },
  },
  {
    text: '닭가슴살 샐러드',
    radius: 90,
    color: 'carrot',
    styles: { top: '255px', left: '90px' },
  },
  {
    text: '',
    radius: 20,
    color: 'deepGreen',
    styles: { top: '210px', left: '220px' },
  },
  {
    text: '파스타',
    radius: 40,
    color: 'deepYellow',
    styles: { top: '275px', left: '290px' },
  },
  {
    text: '',
    radius: 25,
    color: 'vegetable',
    styles: { top: '370px', left: '285px' },
  },
  {
    text: '두부조림',
    radius: 50,
    color: 'vegetable',
    styles: { top: '295px', left: '385px' },
  },
  {
    text: '',
    radius: 12,
    color: 'deepGreen',
    styles: { top: '260px', left: '370px' },
  },
  {
    text: '짜장면',
    radius: 45,
    color: 'deepYellow',
    styles: { top: '190px', left: '400px' },
  },

  {
    text: '돈까스 덮밥',
    radius: 65,
    color: 'deepOrange',
    styles: { top: '225px', left: '495px' },
  },
  {
    text: '회',
    radius: 30,
    color: 'deepYellow',
    styles: { top: '305px', left: '10px' },
  },
  {
    text: '',
    radius: 20,
    color: 'deepYellow',
    styles: { top: '195px', left: '-20px' },
  },
];

interface likeTextElement {
  text: string;
  radius: number;
  color: Colors;
  styles: ViewStyle;
}
