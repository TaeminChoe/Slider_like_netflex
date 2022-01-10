# 이미지 슬라이더 실습

-   Netflex의 홈페이지처럼 이미지 슬라이더를 작성해 보았습니다.
-   babel polyfill을 적용하여 ie 11브라우저 에서도 정상 동작합니다.
-   창 크기에 따른 반응형 웹으로 작성하였습니다.

## 프로젝트 파일 구조

![image](https://user-images.githubusercontent.com/92558961/148731960-6d844cc2-495b-40a6-a258-15f12585f7e4.png)

## Image source

-   slider/public/imgs 폴더에 png파일로 관리합니다.
-   이미지는 1:1.618 비율의 원색 이미지 입니다.

![image](https://user-images.githubusercontent.com/92558961/148731994-5d05100a-40bd-4d95-893f-eeec10c1f947.png)

## data.json

-   이미지의 경로를 관리하는 json파일입니다.
-   다음과 같은 형식으로 저장됩니다.

![image](https://user-images.githubusercontent.com/92558961/148732015-abcb62f7-282c-4616-92fa-8f22adb71203.png)

## App.js

![image](https://user-images.githubusercontent.com/92558961/148732025-23ae4e50-85a3-4090-b4aa-02f10d5f1397.png)

-   show props를 전달하면서, slider에서 몇 개의 컨텐츠를 보일지 설정 할 수 있다.

## Slider.js

![image](https://user-images.githubusercontent.com/92558961/148732034-de0441f8-db43-4c1b-8b32-ac7065d6c407.png)

-   data.color은 위 db/data.json을 import한 것입니다.
-   7: WINDOW_WIDTH: 브라우저의 전체 창 비율(width 기준)
-   8: BUTTON_WIDTH : slider 양 옆의 버튼의 width 비율
-   9: PADDING : 컨텐츠 사이의 공간 비율
-   10: STRIDE : 움직임 버튼 클릭시 컨텐츠가 옆으로 이동할 보폭 크기
-   11: IMG_SIZE : margin과 padding을 제외한 공간을 컨텐츠 개수로 나누어 균등하게 이미지를 출력하기 위함
-   14: transX : slider 박스의 움직임 값
-   15: leftBtn : 왼쪽 버튼의 visible 유무
    -   맨 왼쪽 페이지를 보여주고 있다면, 왼쪽 버튼 hidden
-   16: rightBtn : 오른쪽 버튼의 visible 유무
    -   맨 오른쪽 페이지를 보여주고 있다면, 오른쪽 버튼 hidden
-   17: page : 총 컨텐츠의 갯수와 보여지는 갯수를 계산하여 page를 표현하기 위함
    -   ex: 10개의 컨텐츠를 4개씩 보여주면 최대 페이지는 3페이지
    -

![image](https://user-images.githubusercontent.com/92558961/148732051-f0f5f2ab-cce6-483c-a954-3d5ed190f20d.png)

-   18: toRight : 오른쪽 버튼 클릭시 발생하는 이벤트 callback 함수.
    -   다음 page로 이동한다.
-   23: toLeft : 왼쪽 버튼 클릭시 발생하는 이벤트 callback 함수
    -   이전 page로 이동한다.
-   28: trans : slider 박스에 transform을 적용하여 움직임을 구현한다.

![image](https://user-images.githubusercontent.com/92558961/148732054-72e2a5a1-2714-4eee-89c2-c0c75d46ec84.png)

-   컨텐츠에 적용될 css

![image](https://user-images.githubusercontent.com/92558961/148732062-00fd2743-fdad-421d-9acf-946a6685875a.png)

-   컨텐츠의 총 갯수와 보여주는 갯수로 page를 계산한다.
-   page의 위치에 따라 이전/다음으로 가는 버튼의 visible을 관리한다.
    -   ex) 1페이지에선 이전 페이지로 이동하지 못하게 left버튼을 hidden한다.
    -   ex) 마지막 페이지에선 다음 페이지로 이동하지 못하게 right버튼을 hidden한다.

![image](https://user-images.githubusercontent.com/92558961/148732070-914ec72e-6b2f-4db7-a9e3-64187931f08e.png)

-   54: span.handle prev : 이전 페이지로 이동하는 버튼을 구현한 태그
-   62: div. sliderMask : 컨텐츠들을 보여줄 태그
-   71: span.handle next : 다음 페이지로 이동하는 버튼을 구현한 태그
-   56, 73: className=active : 각 버튼의 state를 활용해 visible을 관리

## Slider.module.css

![image](https://user-images.githubusercontent.com/92558961/148732083-cd1f8766-d0a6-4e86-bcab-8c9d663dca8a.png)

-   6: white-space : 컨텐츠들이 화면을 넘어서도 다음 라인으로 넘어가지 않게 하기 위함
-   7: transition : 컨텐츠가 이동하는 애니매이션이 동작하는 속도
-   10: img:hover : 이미지에 커서를 가져다 놨을 때, 이미지가 1.08배로 커지는 애니매이션

![image](https://user-images.githubusercontent.com/92558961/148732090-5712214c-eb71-44b3-a33e-27fc24e87fc1.png)

-   14: .handle : 버튼에 적용되는 css
    -   position : 컨텐츠들과 겹치는 등의 다른 배치를 위해 적용
    -   z-index : 적용된 컨텐츠가 위로 올라올지, 아래로 올라올지 설정
    -   background: rgba : background의 색상과 투명도까지 지정
    -   cursor : 커서를 가져다 놨을 때, 커서의 모양이 손 모양으로 바뀜

![image](https://user-images.githubusercontent.com/92558961/148732102-dd247ee8-25ff-45f5-9c46-0ed6a949f739.png)

-   29, 34: 이전/다음 페이지 버튼에 적용될 css
    -   left, right: 왼쪽/오른쪽에서 1% 떨어진 위치에 배치됨
    -   기본 세팅으로 hidden이 되어 있음
-   39 : state값의 변환에 따라 hidden → visible이 되어 버튼이 보여지고 사라짐

## 실행결과.

### 컨텐츠가 3개일 때,

![Untitled](https://user-images.githubusercontent.com/92558961/148732133-10b53d76-d7bc-4b77-ad02-2f119b718598.png)

![Untitled (1)](https://user-images.githubusercontent.com/92558961/148732175-ab1b1d99-a5ef-42da-937c-c3e767e943eb.png)

### 컨텐츠가 5개일 때,

![Untitled (2)](https://user-images.githubusercontent.com/92558961/148732177-fc6d87ea-fc6c-4369-ac44-afffcf406631.png)

![Untitled (3)](https://user-images.githubusercontent.com/92558961/148732179-cb7814b9-8144-4e69-a143-9ddb845d1257.png)

### 컨텐츠가 6개일 때,

![Untitled (4)](https://user-images.githubusercontent.com/92558961/148732182-dd877f45-242a-48ad-bf44-f3861c1fe322.png)

![Untitled (5)](https://user-images.githubusercontent.com/92558961/148732185-cfd22005-d488-431c-b129-0784e051cd56.png)

### 해상도 변화에도 비율이 유지되는 모습

472 x 775

![Untitled (6)](https://user-images.githubusercontent.com/92558961/148732192-15872397-b2e9-4a4f-b888-c07e47547d3c.png)

954 x 775

![Untitled (7)](https://user-images.githubusercontent.com/92558961/148732197-a483e4ec-f774-4302-91a5-331b3590534c.png)
