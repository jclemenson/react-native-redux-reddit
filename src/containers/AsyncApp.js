import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';

import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../actions'

import Button from '../components/Button';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('componentDidMount')
    console.log(this.props)
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  handleChange = (nextSubreddit) => {
    this.props.dispatch(selectSubreddit(nextSubreddit));
  }

  handleRefreshClick = (e) => {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <View>
        <Picker value={selectedSubreddit}
                onChange={this.handleChange}
                options={[ 'reactjs', 'frontend' ]} />
        <View>
          {lastUpdated &&
            <Text>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </Text>
          }
          {!isFetching &&
            <Button
               onPress={this.handleRefreshClick}
               label='Refresh'/>
          }
        </View>
        {isFetching && posts.length === 0 &&
          <Text style={styles.h2}>Loading...</Text>
        }
        {!isFetching && posts.length === 0 &&
          <Text style={styles.h2}>Empty.</Text>
        }
        {posts.length > 0 &&
          <View style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </View>
        }
      </View>
    );
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  h2: {

  }
});

function mapStatesToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state;


  console.log(`postsBySubreddit[selectedSubreddit]`);
  // console.log(postsBySubreddit[selectedSubreddit]);

  let {
    isFetching,
    lastUpdated,
    items: posts,
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: false,
    items: [],
  }

  console.log(posts)

  // if (typeof posts == 'undefined') {
  //   posts = []
  // }
  //
  // if (typeof isFetching == 'undefined') {
  //   isFetching = true;
  // }

  // console.log(`posts: ${posts}`)

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStatesToProps)(AsyncApp);
