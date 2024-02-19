//定义高阶组件 withRouter为了给类组件传递路由参数
//函数
import { useParams, useSearchParams } from "react-router-dom";

function withRouter(Component) {
  return function () {
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = [...searchParams.entries()].reduce((prev, [key, value]) => {
      prev[key] = value;
      return prev;
    }, {});
    return (
      <Component params={params} {...query} setSearchParams={setSearchParams} />
    );
  };
}
export default withRouter;
