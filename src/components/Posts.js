import React, {
  Component,
  ListView,
  PropTypes,
  StyleSheet,
  Text
} from 'react-native';

export default class Posts extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(this.props.posts)
    };
  }

  renderRow = (rowData) => {
    return (
      <Text style={styles.row}>
        {rowData.title}
      </Text>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={styles.list}/>

      // <ul>
      //   {this.props.posts.map((post, i) =>
      //     <li key={i}>{post.title}</li>
      //   )}
      // </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    fontSize: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  list: {
  }
});
