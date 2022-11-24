
const NavHeader = {
    name: 'navHeader',
    props: ['navConfig', 'changeTheme', 'openSet', 'theme'],
    template: `<div class="nav-header">
    <div class="nav-header-left">
      <ul>
        <div class="logo"></div>
        <li v-for="(index, item) in navConfig.left" :key="index">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="nav-header-right">
      <ul>
        <li v-for="(index, item) in navConfig.right" :key="index" @click="handleSet(item)">
          <span v-html="theme === 'light' ? item.Icon : item.activeIcon"></span>
        </li>
      </ul>
      <div class="author">
        <a href="https://juejin.cn/user/4142615542920680" target="_blank">Maic</a>
      </div>
    </div>
  </div>`,
    methods: {
        handleSet({ type }) {
            // 修改主题
            if (type === 'theme') {
                this.changeTheme();
            } else if (type === 'set') {
                this.openSet();
            }
        }
    }
}
const Search = {
    name: 'search',
    props: ['searchConig', "searchStyle"],
    template: `<div class="search" v-bind:style="searchStyle">
    <div class="search-input">
      <input type="text" placeholder="请搜索..." />
    </div>
    <div class="quick-nav">
      <p v-for="(index, item) in searchConig.nav" :key="index">
        <a v-if="item.link" :href="item.link">{{item.name}}</a>
        <span v-else>{{item.name}}</span>
      </p>
    </div>
  </div>`
}
const ItemCard = {
    name: 'item-card',
    props: ["formCondation", "typeData", "listData"],
    template: `<div class="item">
    <div class="item-title">
      <div class="item-title-left">
        <slot name="title-lf"/>
      </div>
      <div class="item-title-right">
        <slot name="title-rt"/>
      </div>
    </div>
    <ul class="item-content">
      <li v-for="(index, item) in listData" :key="index">
        <div class="item-content-title">
          {{item.title}}
        </div>
        <slot>
            <div class="item-content-ft">
            <div v-if="item.author">{{item.author}}</div>
                <div v-else>{{item.time}}</div>
                <div>
                    <span>赞 {{item.approve}}</span>
                    <span>评论 {{item.remark}}</span>
                </div>
            </div>
        </slot>
      </li>
    </ul>
  </div>`
}
const BaseLayoutContent = {
    name: 'base-content',
    template: `<div class="content">
    <div class="card-left">
      <slot name="left" />
    </div>
    <div class="card-center">
      <slot name="center" />
    </div>
    <div class="card-right">
      <slot name="right" />
    </div>
  </div>`
}

const PopupList = {
    name: 'popup-list',
    props: ['popupList', 'openSet'],
    template: `<div class="popup-list">
    <ul>
      <li v-for="(index, item) in popupList" :key="index" @click="handlePopup(item)">
        {{item.title}}
      </li>
    </ul>
  </div>`,
    methods: {
        handlePopup({ type }) {
            if (type === 'set') {
                this.openSet();
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    console.log(tabs)
                    chrome.tabs.sendMessage(tabs[0].id, true, function (response) {
                        console.log(response, 'content.js回传过来的信息');
                    })
                })
            } else if (type === 'newTab') {
                chrome.tabs.create({ url: 'index.html' })
            }
        }
    }
}
const SetPopup = {
    name: 'SetPopup',
    props: ['handleClose', 'showSet'],
    template: `<div class="set">
    <div class="mask" @click.stop="handleClose"></div>
    <div :class="['set-content', showSet ? 'set-content-show': '']">
      <div>
        <img
          src="https://files.mdnice.com/user/24614/b9852f54-1289-4559-9adc-44933bc29b97.png"
          alt=""
          width="200"
          height="200"
        />
      </div>
      <h3>
        技术博客:<a href="https://learn.wmcweb.cn/" target="_blank"
          >Web技术学苑</a
        >
      </h3>
      <h3>author:Maic</h3>
      <h3>
        github:<a href="https://github.com/maicFir" target="_blank"
          >https://github.com/maicFir</a
        >
      </h3>
    </div>
  </div>`
}
const initData = {
    listData: [
        // {
        //     title: "Three.js 进阶之旅：基础入门（下）",
        //     timer: "三个月以前",
        //     approve: 100,
        //     remark: 80
        // }
    ],
    gitHubData: [],
    fdlistData: [],
    formCondation: {
        type: '2',
        source: '0',
        listStatus: 0,
        gitStatus: 0,
        fdStatus: 0
    },
    theme: 'light', // light dart
    typeData: [
        {
            value: '0',
            name: '前端'
        },
        {
            value: '1',
            name: '后端'
        },
        {
            value: '2',
            name: '综合'
        }

    ],
    githubData: [
        {
            value: '0',
            name: 'Github'
        },
        {
            value: '1',
            name: 'Gitee'
        },
        {
            value: '2',
            name: '博客园'
        }
    ],
    navConfig: {
        left: [
            {
                name: '课程',
                link: '',
                popup: true,
            },
            {
                name: 'APP',
                link: '',
                popup: true,
            },
            {
                name: '马上掘金',
                link: '',
                popup: false,
            },
            {
                name: '会员',
                link: '',
                popup: true,
            }
        ],
        right: [
            {
                type: 'theme',
                Icon: '<svg class="icon-night" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-1c036078=""><path d="M13 2C13.6567 2 14.3059 2.06344 14.9409 2.18842L16.488 2.49289L15.553 3.76254C14.5494 5.12552 14 6.7699 14 8.5C14 12.3391 16.725 15.617 20.4453 16.3492L21.9921 16.6536L21.0575 17.9232C19.1853 20.4667 16.2196 22 13 22C7.47715 22 3 17.5228 3 12C3 6.47715 7.47715 2 13 2Z" data-v-1c036078=""></path></svg>',
                activeIcon: '<svg class="icon-day" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-1c036078=""><path fill-rule="evenodd" clip-rule="evenodd" d="M13 1.1C13 0.768629 12.7761 0.5 12.5 0.5H11.5C11.2239 0.5 11 0.768629 11 1.1V2.9C11 3.23137 11.2239 3.5 11.5 3.5H12.5C12.7761 3.5 13 3.23137 13 2.9V1.1ZM20.4998 4.20711L19.7927 3.5C19.5975 3.30474 19.2809 3.30474 19.0856 3.5L17.6567 4.92894C17.4614 5.1242 17.4614 5.44078 17.6567 5.63605L18.3638 6.34315C18.5591 6.53841 18.8757 6.53841 19.0709 6.34315L20.4998 4.91421C20.6951 4.71895 20.6951 4.40237 20.4998 4.20711ZM12 4.5C16.1421 4.5 19.5 7.85786 19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5ZM5.63589 17.6569L6.343 18.364C6.53826 18.5592 6.53826 18.8758 6.343 19.0711L4.99995 20.4141C4.80469 20.6093 4.48811 20.6093 4.29284 20.4141L3.58574 19.707C3.39047 19.5117 3.39047 19.1951 3.58574 18.9999L4.92879 17.6569C5.12405 17.4616 5.44063 17.4616 5.63589 17.6569ZM12.5 20.5C12.7761 20.5 13 20.7239 13 21V23C13 23.2761 12.7761 23.5 12.5 23.5H11.5C11.2239 23.5 11 23.2761 11 23V21C11 20.7239 11.2239 20.5 11.5 20.5H12.5ZM20.4142 19.0002L19.0709 17.6569C18.8757 17.4616 18.5591 17.4616 18.3638 17.6569L17.6567 18.364C17.4614 18.5592 17.4614 18.8758 17.6567 19.0711L19 20.4144C19.1953 20.6096 19.5118 20.6096 19.7071 20.4144L20.4142 19.7073C20.6095 19.512 20.6095 19.1954 20.4142 19.0002ZM3.5 11.5C3.5 11.2239 3.27614 11 3 11H1C0.723858 11 0.5 11.2239 0.5 11.5V12.5C0.5 12.7761 0.723858 13 1 13H3C3.27614 13 3.5 12.7761 3.5 12.5V11.5ZM23 11C23.2761 11 23.5 11.2239 23.5 11.5V12.5C23.5 12.7761 23.2761 13 23 13H21C20.7239 13 20.5 12.7761 20.5 12.5V11.5C20.5 11.2239 20.7239 11 21 11H23ZM4.91414 3.50014L6.343 4.92894C6.53826 5.1242 6.53826 5.44079 6.343 5.63605L5.63589 6.34315C5.44063 6.53841 5.12405 6.53841 4.92879 6.34315L3.49992 4.91435C3.30466 4.71909 3.30466 4.40251 3.49992 4.20724L4.20703 3.50014C4.40229 3.30487 4.71887 3.30487 4.91414 3.50014Z"></path></svg>'
            },
            {
                type: 'set',
                Icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-8e6f4044=""><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 1.09094C12.809 1.09094 13.607 1.17997 14.3838 1.35486L14.832 1.45578L16.2299 4.64258L19.6717 4.26633L19.9828 4.60521C21.072 5.79163 21.8893 7.20671 22.3684 8.75213L22.5034 9.18779L22.2349 9.55649L20.4554 12L22.5034 14.8123L22.3684 15.2479C21.8893 16.7934 21.072 18.2084 19.9828 19.3949L19.6717 19.7337L16.2299 19.3575L14.832 22.5443L14.3838 22.6452C13.607 22.8201 12.809 22.9091 12.0001 22.9091C11.191 22.9091 10.3928 22.8201 9.61586 22.6451L9.16756 22.5441L8.98302 22.1233L7.77022 19.3575L4.32851 19.7337L4.01738 19.3949C2.928 18.2083 2.11072 16.793 1.63163 15.2474L1.49658 14.8117L1.76517 14.443L3.54473 12L1.49658 9.18838L1.63163 8.75267C2.11072 7.20704 2.928 5.79177 4.01738 4.60521L4.32851 4.26633L7.77022 4.64258L9.16756 1.45593L9.61586 1.35498C10.3928 1.18001 11.191 1.09094 12.0001 1.09094ZM12.0001 7.45457C14.5019 7.45457 16.5282 9.49061 16.5282 12C16.5282 14.5094 14.5019 16.5455 12.0001 16.5455C9.49827 16.5455 7.47192 14.5094 7.47192 12C7.47192 9.49061 9.49827 7.45457 12.0001 7.45457ZM9.29004 12C9.29004 10.4928 10.5043 9.27277 12 9.27277C13.4957 9.27277 14.71 10.4928 14.71 12C14.71 13.5072 13.4957 14.7273 12 14.7273C10.5043 14.7273 9.29004 13.5072 9.29004 12Z"></path></svg>',
                activeIcon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-8e6f4044=""><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 1.09094C12.809 1.09094 13.607 1.17997 14.3838 1.35486L14.832 1.45578L16.2299 4.64258L19.6717 4.26633L19.9828 4.60521C21.072 5.79163 21.8893 7.20671 22.3684 8.75213L22.5034 9.18779L22.2349 9.55649L20.4554 12L22.5034 14.8123L22.3684 15.2479C21.8893 16.7934 21.072 18.2084 19.9828 19.3949L19.6717 19.7337L16.2299 19.3575L14.832 22.5443L14.3838 22.6452C13.607 22.8201 12.809 22.9091 12.0001 22.9091C11.191 22.9091 10.3928 22.8201 9.61586 22.6451L9.16756 22.5441L8.98302 22.1233L7.77022 19.3575L4.32851 19.7337L4.01738 19.3949C2.928 18.2083 2.11072 16.793 1.63163 15.2474L1.49658 14.8117L1.76517 14.443L3.54473 12L1.49658 9.18838L1.63163 8.75267C2.11072 7.20704 2.928 5.79177 4.01738 4.60521L4.32851 4.26633L7.77022 4.64258L9.16756 1.45593L9.61586 1.35498C10.3928 1.18001 11.191 1.09094 12.0001 1.09094ZM12.0001 7.45457C14.5019 7.45457 16.5282 9.49061 16.5282 12C16.5282 14.5094 14.5019 16.5455 12.0001 16.5455C9.49827 16.5455 7.47192 14.5094 7.47192 12C7.47192 9.49061 9.49827 7.45457 12.0001 7.45457ZM9.29004 12C9.29004 10.4928 10.5043 9.27277 12 9.27277C13.4957 9.27277 14.71 10.4928 14.71 12C14.71 13.5072 13.4957 14.7273 12 14.7273C10.5043 14.7273 9.29004 13.5072 9.29004 12Z"></path></svg>'
            }
        ]
    },
    searchConig: {
        nav: [
            {
                name: '快捷导航',
                link: ''
            },
            {
                name: 'Web技术学苑',
                link: 'https://learn.wmcweb.cn/'
            },
            {
                name: '稀土掘金',
                link: 'https://juejin.cn/'
            },
            {
                name: '知乎',
                link: 'https://www.zhihu.com'
            },
            {
                name: '哔哩哔哩',
                link: 'https://www.bilibili.com/'
            }
        ]
    },
    popupList: [
        {
            title: '打开新标签页',
            type: 'newTab'
        },
        {
            title: '设置',
            type: 'set'
        }
    ],
    showSet: false
};

var vm = new Vue({
    el: '#app',
    components: {
        BaseLayoutContent,
        NavHeader,
        Search,
        ItemCard,
        PopupList,
        SetPopup
    },
    data: initData,
    methods: {
        async getData(typeStatus, status = 0) {
            const { listData, gitHubData, fdlistData } = await request({ url: 'https://mock.mengxuegu.com/mock/637e3376cedbd00ec9c7854a/chrome/query' });
            if (typeStatus === 'gitStatus') {
                this.gitHubData = gitHubData;
            } else if (typeStatus === 'fdStatus') {
                this.fdlistData = fdlistData;
            } else if (typeStatus === 'listStatus') {
                this.listData = listData;
            } else {
                this.gitHubData = gitHubData;
                this.fdlistData = fdlistData;
                this.listData = listData;
            }
            this.formCondation[typeStatus] = status;
        },
        changeTheme() {
            // 修改主题
            if (this.theme === 'light') {
                this.theme = 'dart'
            } else {
                this.theme = 'light';
            }
        },
        openSet() {
            // 打开右侧设置抽屉
            this.showSet = true;
        },
        handleClose() {
            this.showSet = false;
        }
    },
    computed: {
        searchStyle() {
            const { theme } = this;
            return theme === 'light' ? { backgroundColor: '#1e80ff' } : {}
        },
        curentPage() {
            const { hash } = window.location;
            let page = 'home';
            if (hash === '#/popup') {
                page = 'popup'
            }
            return page;
        }
    },
    created() {
        this.getData();
    },
})
