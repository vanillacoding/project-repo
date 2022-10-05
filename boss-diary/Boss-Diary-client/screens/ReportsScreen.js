import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Alert, CameraRoll } from 'react-native';
import LoadingSpinner from '../components/Spinner';
import Report from '../components/Report';
import ReportModal from '../components/ReportModal';
import EmptyScreen from '../components/EmptyScreen';

export default function ReportsScreen(props) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isRefreshing, setIsRefreshing ] = useState(false);
  const [ isAllLoaded, setIsAllLoaded ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ clickedReport, setClickedReport ] = useState(null);
  const [ pageNumber, setPageNumber ] = useState(1);

  const {
    userReports,
    profilePhoto,
    numOfNewReport,
    fetchUserData,
    fetchUserReports,
    onUserSearch,
    onRefreshReports,
    onApprovalRequest,
    onDeleteReport
  } = props.screenProps;

  useEffect(() => {
    setIsLoading(true);
    fetchUserData();
    _loadMoreReports();
  }, []);

  const _loadMoreReports = async() => {
    try {
      if (isAllLoaded) return;

      const fetchedReports = await fetchUserReports(pageNumber, numOfNewReport);

      if (!fetchedReports.length) {
        setIsLoading(false);
        setIsAllLoaded(true);

        if (pageNumber === 1) {
          return Alert.alert('빈 보고서', '보고서를 작성하세요');
        }
        return;
      }

      setPageNumber(pageNumber + 1);
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const _refresh = async() => {
    try {
      setIsRefreshing(true);

      await onRefreshReports(1);

      setPageNumber(2);
      setIsRefreshing(false);
      setIsAllLoaded(false);
    } catch(err) {
      setPageNumber(2);
      setIsRefreshing(false);
    }
  };

  const _saveToCameraRoll = url => async() => {
    try {
      Alert.alert(
        '사진첩 저장',
        '사진첩에 저장하시겠습니까?',
        [
          {
            text: '저장',
            onPress: async() => {
              await CameraRoll.saveToCameraRoll(url, 'photo');
              Alert.alert('사진첩 저장', '사진첩에 저장되었습니다');
            }
          },
          {
            text: '취소',
            style: 'destructive',
          },
        ]
      );
    } catch(err) {
      Alert.alert('사진첩 저장 에러', '다시 시도해주세요');
      console.log(err);
    }
  };

  const _clickDelete = reportId => () => {
    try {
      Alert.alert(
        '보고서 삭제',
        '선택한 보고서를 삭제하시겠습니까?',
        [
          {
            text: '삭제',
            onPress: async() => {
              await onDeleteReport(reportId);
              Alert.alert('보고서 삭제', '보고서가 삭제되었습니다');
            }
          },
          {
            text: '취소',
            style: 'destructive',
          },
        ]
      );
    } catch(err) {
      Alert.alert('보고서 삭제 에러', '다시 시도해주세요');
      console.log(err);
    }
  };

  const _toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const _clickReport = reportId => () => {
    setClickedReport(reportId);
  };

  const _requestApproval = userId => {
    onApprovalRequest(userId, clickedReport);
  };

  const _footerSpinner = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    return null;
  };

  if (isLoading) return <LoadingSpinner />;
  if (!isLoading && !userReports.length) return <EmptyScreen message={'작성한 보고서가 없습니다'}/>;

  return (
    <SafeAreaView>
      <FlatList
        data={userReports}
        keyExtractor={item => item._id}
        refreshing={isRefreshing}
        onRefresh={_refresh}
        onEndReachedThreshold={0.05}
        onEndReached={_loadMoreReports}
        ListFooterComponent={_footerSpinner}
        renderItem={({ item }) => (
          <Report
            key={item._id}
            buttonText={'결재 요청'}
            profilePhoto={profilePhoto}
            report={item}
            openModal={_toggleModal}
            onUserSearch={onUserSearch}
            onSaveClick={_saveToCameraRoll(item.url)}
            onDeleteClick={_clickDelete(item._id)}
            onClick={_clickReport(item._id)}
            isApprovalPage={false}
          />
        )}
      />
      <ReportModal
        modalVisible={modalVisible}
        closeModal={_toggleModal}
        onUserSearch={onUserSearch}
        toggleModal={_toggleModal}
        onClick={_requestApproval}
      />
    </SafeAreaView>
  );
}
