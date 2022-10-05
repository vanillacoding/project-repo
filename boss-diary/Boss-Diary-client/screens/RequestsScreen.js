import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Alert } from 'react-native';
import LoadingSpinner from '../components/Spinner';
import Report from '../components/Report';
import EmptyScreen from '../components/EmptyScreen';

export default function RequestsScreen(props) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isFetching, setIsFetching ] = useState(false);
  const [ isRefreshing, setIsRefreshing ] = useState(false);
  const [ isAllLoaded, setIsAllLoaded ] = useState(false);
  const [ pageNumber, setPageNumber ] = useState(1);

  const {
    approvalRequests,
    fetchApprovalRequests,
    onRefreshRequests,
    onApprovalConfirm
  } = props.screenProps;

  useEffect(() => {
    setIsLoading(true);
    _loadMoreReports();
  }, []);

  const _loadMoreReports = async() => {
    try {
      if (isAllLoaded || isFetching) return;

      setIsFetching(true);
      const fetchedReports = await fetchApprovalRequests(pageNumber);

      if (!fetchedReports.length) {
        setIsLoading(false);
        setIsFetching(false);
        setIsAllLoaded(true);

        if (pageNumber === 1) {
          return Alert.alert('결재 요청', '결재 요청이 없습니다');
        }
        return;
      }

      setPageNumber(pageNumber + 1);
      setIsLoading(false);
      setIsFetching(false);
    } catch(err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const _refresh = async() => {
    try {
      setIsRefreshing(true);

      await onRefreshRequests(1);

      setPageNumber(2);
      setIsRefreshing(false);
      setIsAllLoaded(false);

    } catch(err) {
      setPageNumber(2);
      setIsRefreshing(false);
    }
  };

  const _clickApproval = reportId => () => {
    Alert.alert(
      '보고서 결재',
      '결재 승인 후 취소할 수 없습니다. \n 보고서 결재를 승인하시겠습니까?',
      [
        {
          text: '승인',
          onPress: async() => {
            await onApprovalConfirm(reportId);
            Alert.alert('결재 승인', '해당 보고서 결재를 완료하였습니다');
          }
        },
        {
          text: '취소',
          style: 'destructive',
        },
      ]
    );
  };

  const _footerSpinner = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    return null;
  };

  if (isLoading) return <LoadingSpinner />;
  if (!isLoading && !approvalRequests.length) return <EmptyScreen message={'보고서 결재 요청이 없습니다'}/>;

  return (
    <SafeAreaView>
      <FlatList
        data={approvalRequests}
        keyExtractor={item => item._id}
        refreshing={isRefreshing}
        onRefresh={_refresh}
        onEndReachedThreshold={0.05}
        onEndReached={_loadMoreReports}
        ListFooterComponent={_footerSpinner}
        renderItem={({ item }) => (
          <Report
            buttonText={'결재 승인'}
            key={item._id}
            report={item}
            onClick={_clickApproval(item._id)}
            profilePhoto={item.profile_photo}
            isApprovalPage={true}
          />
        )}
      />
    </SafeAreaView>
  );
}
