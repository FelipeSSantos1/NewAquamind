import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

// import FakeLoadingScreen from '../Components/FakeLoadingScreen'
import ConfigRTK from '../../store/config'
import FeedRTK from '../../store/feed'
import { RootState } from '../../store/rootReducer'
import { getAllFeed } from '../../API/feed'
import { ScrollView } from './styles'
import FeedBox from './Components/FeedBox'
import { NavPropsFeed } from '../../routes/types'

const Feed: React.FC<NavPropsFeed> = ({ navigation }) => {
  const dispatch = useDispatch()
  const feeds = useSelector((state: RootState) => state.feed)
  useEffect(() => {
    async function fetchFeed() {
      const response = await getAllFeed({ take: 10, cursor: 0 })

      if (!response) {
        return
      }
      if ('statusCode' in response) {
        dispatch(
          ConfigRTK.actions.setAlert({
            visible: true,
            alertTitle: 'Oops!',
            alertMessage: response.message,
            okText: 'Ok',
          })
        )
        return
      }

      if (response) {
        dispatch(FeedRTK.actions.setFeed(response))
      }
    }
    fetchFeed()
  }, [dispatch])

  const renderFeed = () => {
    return _.map(feeds, feed => (
      <FeedBox key={feed.id} feed={feed} navigation={navigation} />
    ))
  }

  if (!feeds) {
    return null
  }
  // if (!feeds) {
  //   return <FakeLoadingScreen />
  // }
  return <ScrollView>{renderFeed()}</ScrollView>
}

export default Feed
