import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { defaultShadowView } from '../../assets/data/shadow';
import { theme, vh, vw } from '../../assets/styles/theme';
import Fonts from '../elements/Fonts';
import { MyProfile, Note, Scrap } from '../elements/Images';

export const UserInfo = ({
  info: { nickname, photo, statusMessage },
  isChange,
  setNickname,
  setMessage,
}: UserInfoProps) => {
  return (
    <UserInfoWrap>
      <BackgroundHeader />
      <UserPhoto uri={photo} />
      <UserDescription
        nickname={nickname}
        statusMessage={statusMessage}
        isChange={isChange}
        setNickname={setNickname}
        setMessage={setMessage}
      />
      <Divider />

      <UserService />
    </UserInfoWrap>
  );
};

const UserPhoto = ({ uri }: { uri: string }) => {
  const [photoError, setPhotoError] = useState(false);

  return (
    <UserPhotoWrap>
      {photoError || uri === '' ? (
        <UserPhotoElement
          source={require('../../assets/images/CheffiLogoBowl.png')}
          resizeMode="contain"
          onError={() => setPhotoError(true)}
        />
      ) : (
        <UserPhotoElement
          source={{ uri }}
          resizeMode="contain"
          onError={() => setPhotoError(true)}
          defaultSource={require('../../assets/images/CheffiLogoBowl.png')}
        />
      )}
    </UserPhotoWrap>
  );
};

const UserDescription = ({
  nickname,
  statusMessage,
  setMessage,
  setNickname,
  isChange,
}: Pick<UserInfo, 'nickname' | 'statusMessage'> &
  Omit<UserInfoProps, 'info'>) => {
  return isChange ? (
    <>
      <UserNickNameInput
        onChangeText={setNickname}
        placeholder="닉네임"
        placeholderTextColor="gray"
      />
      <UserMessageInput
        onChangeText={setMessage}
        placeholder="상태 메세지를 입력해 주세요."
        placeholderTextColor="gray"
      />
    </>
  ) : (
    <>
      <UserNickNameWrap>
        <Fonts
          children={nickname || '익명'}
          color="tableBlack"
          size="xlarge"
          bold
        />
      </UserNickNameWrap>
      <UserMessageWrap>
        <Fonts children={statusMessage} color="tableGray" size="mediumLarge" />
      </UserMessageWrap>
    </>
  );
};

const UserService = () => {
  const navigation = useNavigation<ProfileNavigationProp & ProfileTabProp>();
  return (
    <UserServiceWrap>
      <IconTextWrap>
        <IconWrap onPress={() => {}}>
          <MyProfile />
        </IconWrap>
        <Fonts children="설정" color="tableGray" />
      </IconTextWrap>
      <IconTextWrap>
        <IconWrap onPress={() => navigation.navigate('history')}>
          <Note />
        </IconWrap>
        <Fonts children="열람 기록" color="tableGray" />
      </IconTextWrap>
      <IconTextWrap>
        <IconWrap onPress={() => navigation.jumpTo('내 레시피')}>
          <Scrap />
        </IconWrap>
        <Fonts children="내 레시피" color="tableGray" />
      </IconTextWrap>
    </UserServiceWrap>
  );
};

const Divider = styled.View`
  width: ${66 * vw}px;
  height: 2px;
  align-self: center;
  margin: ${1.5 * vh}px 0;
  background-color: ${theme.color.tableGray + '55'};
`;

const UserInfoWrap = styled.View`
  justify-content: center;
  align-items: center;
`;
const UserServiceWrap = styled.View`
  width: ${60 * vw}px;
  height: ${10 * vh}px;
  justify-content: space-between;
  align-items: center;
  /* margin-top: ${2 * vh}px; */
  flex-direction: row;
  /* background-color: red; */
`;
const UserMessageWrap = styled.View`
  justify-content: center;
  align-items: center;
  width: ${55 * vw}px;
  height: ${9 * vh}px;
  /* background-color: green; */
`;
const UserMessageInput = styled.TextInput`
  justify-content: center;
  align-items: center;
  width: ${55 * vw}px;
  height: ${9 * vh}px;
  font-size: ${theme.text.mediumLarge};
  /* background-color: green; */
`;
const UserNickNameWrap = styled.View`
  justify-content: center;
  align-items: center;
  padding: ${1.2 * vh}px ${8 * vw}px;
  background-color: ${theme.color.carrot + '33'};
  border-radius: 50px;
  margin-top: ${1.4 * vh}px;
  margin-bottom: ${1 * vh}px;
`;
const UserNickNameInput = styled.TextInput`
  font-size: ${theme.text.large};
  justify-content: center;
  align-items: center;
  padding: ${1.1 * vh}px ${8 * vw}px;
  background-color: ${theme.color.carrot + '33'};
  border-radius: 50px;
  margin-top: ${1.4 * vh}px;
  margin-bottom: ${1 * vh}px;
`;
const UserPhotoWrap = styled(defaultShadowView)`
  margin-top: ${1.5 * vh}px;
  margin-bottom: ${1.5 * vh}px;
  width: ${40 * vw}px;
  height: ${40 * vw}px;
  elevation: 8;

  padding: 10px;
  border-radius: ${20 * vw}px;
  border-width: 1px;
  border-color: ${theme.color.tableGray};
  background-color: white;
`;
const UserPhotoElement = styled.Image`
  width: 100%;
  height: 100%;
`;
const BackgroundHeader = styled.View`
  background-color: #ff9140;
  border-bottom-left-radius: ${60 * vw}px;
  border-bottom-right-radius: ${60 * vw}px;
  shadow-color: black;
  shadow-opacity: 0.7;
  shadow-offset: 0 0;
  shadow-radius: 16px;
  elevation: 6;
  height: ${40 * vh}px;
  width: ${120 * vw}px;
  align-self: center;
  position: absolute;
  top: ${-25 * vh}px;
`;

const IconWrap = styled.TouchableOpacity`
  width: ${16 * vw}px;
  height: ${16 * vw}px;
  padding: 5px;
  margin: 0;
  border-radius: ${8 * vw}px;
  border-width: 1px;
  border-color: ${theme.color.white};
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const IconTextWrap = styled.View`
  justify-content: space-around;
  align-items: center;
  width: 33%;
  height: 100%;
`;

interface UserInfoProps {
  info: UserInfo;
  isChange: boolean;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
}
