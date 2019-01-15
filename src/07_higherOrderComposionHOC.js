import React from 'react';
import ReactDOM from 'react-dom';



// export default Fragment;
// 將同樣行為的組件打包成一個function, 根據組建行為的輸入來輸入類似的組件
//並且是根據相同的資料來源，此時就適合用HOC方法

// const CommentListWithSub = WithSub(
//   CommentList,
//   (DataSrc) => DataSrc.getComments()
// );
// const BlogPostWithSub = WithSub(
//   BlogPost,
//   (DataSrc, props) => DataSrc.getBlogPost(props.id)
// )

//HOC render(): 通常會是
render() {
  //將額外的props分開，然後不要將他傳值過來
  const { extraProp, ...passThroughProps } = this.props;
  //插入的props給這個component 會是state, method之類的
  const injectedProps = someStateInstanceMethod;

  // 將值傳遞給組件，插入的值和傳遞下來的值
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps} />
  );
}




//Don't use HOC inside the render method
