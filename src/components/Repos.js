import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);

  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
          //nếu không có language trả về total và không làm gì cả
    if (!language) return total;
           //kiểm tra có thuộc tính language trong total hay không
    if (!total[language]) {
            // nếu không có thuộc tính thì tạo 1 thuộc tính đặt nó bằng object
             //label là thuộc tính mà biểu đồ tìm kiếm, đặt nó bằng language 
      total[language] = {label:language, value:1,stars:stargazers_count}
    } else {
           //nếu có thì tạo object chứa giữ nguyên các thuộc tính và value + 1 
            // value sẽ bằng giá trị hiện tại + 1
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      }
    }
    return total;
  }, {})
  
  // Muốn có dữ liệu từ object sang dạng mảng, dùng Object.values()
 const mostUsed = Object.values(languages).sort((a, b) => {
    // dùng sort để sắp xếp
    return a.value - b.value;
  }).slice(0, 5);
  // dùng slice để lấy 5 phần tử đầu trong data



  //most stars per language
  const mostPopular = Object.values(languages).sort((a, b) => {
    return b.stars - a.stars;
  }).map((item) => {
    return {...item,value:item.stars}
  }).slice(0,5);
 

  //stars, forks
  let { stars, forks } = repos.reduce((total, item) => {
    const { stargazers_count, name, forks } = item;
    total.stars[stargazers_count] = { label: name, value: stargazers_count };
    total.forks[forks] = {label:name,value:forks}
    return total
  }, {
    stars:{},forks:{}
  })

  stars = Object.values(stars).slice(-5).reverse();
   forks = Object.values(forks).slice(-5).reverse();

  return <section className="section">
    <Wrapper className="section-center">
      <Pie3D data={mostUsed} />
       <Column3D data={stars} />
      <Doughnut2D data={mostPopular} />
      <Bar3D data={forks} />
     
    </Wrapper>
  </section>
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
