(self.webpackChunktradingview=self.webpackChunktradingview||[]).push([[3005],{77511:e=>{e.exports={group:"group-T57LDNqT",noLeftDecoration:"noLeftDecoration-T57LDNqT",noRightDecoration:"noRightDecoration-T57LDNqT",noMinimalWidth:"noMinimalWidth-T57LDNqT",newStyles:"newStyles-T57LDNqT",separator:"separator-T57LDNqT",separatorWrap:"separatorWrap-T57LDNqT"}},71747:e=>{e.exports={"css-value-header-toolbar-height":"38px",wrap:"wrap-7mUBPdQo"}},85291:e=>{e.exports={"css-value-header-toolbar-height":"38px",toolbar:"toolbar-ymEQuMuZ",isHidden:"isHidden-ymEQuMuZ",overflowWrap:"overflowWrap-ymEQuMuZ",customButton:"customButton-ymEQuMuZ",hovered:"hovered-ymEQuMuZ"}},36971:e=>{e.exports={wrap:"wrap-zQWNyqoF",icon:"icon-zQWNyqoF"}},93067:e=>{e.exports={"css-value-header-toolbar-height":"38px",inner:"inner-Kbdz4qEM",fake:"fake-Kbdz4qEM",fill:"fill-Kbdz4qEM",collapse:"collapse-Kbdz4qEM",button:"button-Kbdz4qEM",iconButton:"iconButton-Kbdz4qEM",hidden:"hidden-Kbdz4qEM",content:"content-Kbdz4qEM",desktopPublish:"desktopPublish-Kbdz4qEM",mobilePublish:"mobilePublish-Kbdz4qEM"}},41814:e=>{e.exports={wrap:"wrap-sfzcrPlH",wrapWithArrowsOuting:"wrapWithArrowsOuting-sfzcrPlH",wrapOverflow:"wrapOverflow-sfzcrPlH",scrollWrap:"scrollWrap-sfzcrPlH",noScrollBar:"noScrollBar-sfzcrPlH",icon:"icon-sfzcrPlH",scrollLeft:"scrollLeft-sfzcrPlH",scrollRight:"scrollRight-sfzcrPlH",isVisible:"isVisible-sfzcrPlH",iconWrap:"iconWrap-sfzcrPlH",fadeLeft:"fadeLeft-sfzcrPlH",fadeRight:"fadeRight-sfzcrPlH"}},9745:(e,t,s)=>{"use strict";s.d(t,{Icon:()=>r});var a=s(59496);const r=a.forwardRef((e,t)=>{const{icon:s="",...r}=e;return a.createElement("span",{...r,ref:t,dangerouslySetInnerHTML:{__html:s}})})},53374:(e,t,s)=>{"use strict";s.d(t,{INTERVALS:()=>r});var a=s(28353);const r=[{name:"",label:(0,a.t)("minutes",{context:"interval"})},{name:"H",label:(0,a.t)("hours",{context:"interval"})},{name:"D",label:(0,a.t)("days",{context:"interval"})},{name:"W",label:(0,a.t)("weeks",{context:"interval"})},{name:"M",label:(0,a.t)("months",{context:"interval"})}]},53335:(e,t,s)=>{"use strict";s.r(t),s.d(t,{HeaderToolbarRenderer:()=>ge});var a=s(59496),r=s(87995),i=s(88537),n=s(97754),o=s(85459),l=s.n(o),c=s(43370),d=s(67337),h=s(76422),u=s(19036),m=s(9837),p=s(32563),v=s(42142),S=s(37669),f=s(77511);function g(e){const{children:t,className:s,noLeftDecoration:r,noRightDecoration:i,noMinimalWidth:o,onClick:l,removeSeparator:c}=e;return a.createElement(a.Fragment,null,S.hasNewHeaderToolbarStyles&&!c&&a.createElement("div",{className:f.separatorWrap},a.createElement("div",{className:f.separator})),a.createElement("div",{className:n(s,f.group,{[f.noMinimalWidth]:o,[f.noLeftDecoration]:r,[f.noRightDecoration]:i,[f.newStyles]:S.hasNewHeaderToolbarStyles}),onClick:l},t))}var y=s(71747);class b extends a.PureComponent{constructor(){super(...arguments),this._handleMeasure=({width:e})=>{this.props.onWidthChange(e)}}render(){const{children:e,shouldMeasure:t}=this.props;return a.createElement(m,{shouldMeasure:t,onMeasure:this._handleMeasure,whitelist:["width"]},a.createElement("div",{
className:y.wrap},e))}}var w=s(28353),_=s(9745),E=s(36971),C=s(59266);const M={text:(0,w.t)("View Only Mode")};function R(e){return a.createElement("div",{className:E.wrap},a.createElement(_.Icon,{className:E.icon,icon:C}),M.text)}var k,T=s(39440),I=s(54475);!function(e){e.SymbolSearch="header-toolbar-symbol-search",e.Intervals="header-toolbar-intervals",e.ChartStyles="header-toolbar-chart-styles",e.Compare="header-toolbar-compare",e.Indicators="header-toolbar-indicators",e.StudyTemplates="header-toolbar-study-templates",e.Dropdown="header-toolbar-dropdown",e.Alerts="header-toolbar-alerts",e.Layouts="header-toolbar-layouts",e.SaveLoad="header-toolbar-save-load",e.UndoRedo="header-toolbar-undo-redo",e.Properties="header-toolbar-properties",e.PublishDesktop="header-toolbar-publish-desktop",e.PublishMobile="header-toolbar-publish-mobile",e.Fullscreen="header-toolbar-fullscreen",e.Screenshot="header-toolbar-screenshot",e.Replay="header-toolbar-replay",e.Financials="header-toolbar-financials",e.StartTrial="header-toolbar-start-trial"}(k||(k={}));var N=s(70412),W=s(55402),F=s(93067);const V=(0,W.registryContextType)();class L extends a.PureComponent{constructor(e,t){super(e,t),this._handleMouseOver=e=>{(0,N.hoverMouseEventFilter)(e)&&this.setState({isHovered:!0})},this._handleMouseOut=e=>{(0,N.hoverMouseEventFilter)(e)&&this.setState({isHovered:!1})},this._handleInnerResize=e=>{const{onWidthChange:t}=this.props;t&&t(e)},this._handleMeasureAvailableSpace=({width:e})=>{const{onAvailableSpaceChange:t}=this.props;t&&t(e)},this._processCustoms=e=>{const{isFake:t,displayMode:s}=this.props,{tools:r}=this.context;return e.map(e=>a.createElement(g,{key:e.id},(e=>{switch(e.type){case"Button":return a.createElement(r.Custom,{...e.params,isFake:t});case"TradingViewStyledButton":return a.createElement(r.CustomTradingViewStyledButton,{...e.params,className:F.button,displayMode:s});case"Dropdown":return a.createElement(r.Dropdown,{displayMode:s,params:e.params});default:return null}})(e)))},this._fixLastGroup=(e,t,s)=>{if(t===s.length-1&&a.isValidElement(e)&&e.type===g){const t=void 0!==this.context.tools.Publish&&!this.props.readOnly;return a.cloneElement(e,{noRightDecoration:t})}return e},(0,W.validateRegistry)(t,{tools:u.any.isRequired}),this.state={isHovered:!1,isAuthenticated:void 0}}componentDidMount(){0}componentWillUnmount(){0}render(){const{tools:e}=this.context,{features:t,displayMode:s,chartSaver:r,studyMarket:i,readOnly:o,saveLoadSyncEmitter:l,leftCustomElements:c,rightCustomElements:d,showScrollbarWhen:h,isFake:u=!1}=this.props,{isHovered:f,isAuthenticated:y}=this.state,w=this._processCustoms(c),_=this._processCustoms(d),E=h.includes(s);return a.createElement("div",{className:n(F.inner,{[F.fake]:u}),onContextMenu:I.preventDefaultForContextMenu,"data-is-fake-main-panel":u},a.createElement(m,{onMeasure:this._handleMeasureAvailableSpace,whitelist:["width"],shouldMeasure:!u},a.createElement(T.HorizontalScroll,{isVisibleFade:p.mobiletouch&&E,isVisibleButtons:!p.mobiletouch&&E&&f,isVisibleScrollbar:!1,shouldMeasure:E&&!u,
onMouseOver:this._handleMouseOver,onMouseOut:this._handleMouseOut},a.createElement("div",{className:F.content},a.createElement(b,{onWidthChange:this._handleInnerResize,shouldMeasure:u},a.createElement(v.FragmentMap,{map:this._fixLastGroup},!o&&a.Children.toArray([e.SymbolSearch&&a.createElement(g,{key:"symbol"},a.createElement(e.SymbolSearch,{id:u?void 0:k.SymbolSearch,isActionsVisible:t.allowSymbolSearchSpread}),S.hasNewHeaderToolbarStyles&&e.Compare&&a.createElement(e.Compare,{id:u?void 0:k.Compare,className:F.button,displayMode:s})),e.DateRange&&a.createElement(g,{key:"range"},a.createElement(e.DateRange,null)),e.Intervals&&a.createElement(g,{key:"intervals"},a.createElement(e.Intervals,{id:u?void 0:k.Intervals,isShownQuicks:t.allowFavoriting,isFavoritingAllowed:t.allowFavoriting,displayMode:s,isFake:u})),e.Bars&&a.createElement(g,{key:"styles"},a.createElement(e.Bars,{id:u?void 0:k.ChartStyles,isShownQuicks:t.allowFavoriting,isFavoritingAllowed:t.allowFavoriting,displayMode:s,isFake:u})),!S.hasNewHeaderToolbarStyles&&e.Compare&&a.createElement(g,{key:"compare"},a.createElement(e.Compare,{id:u?void 0:k.Compare,className:F.button,displayMode:s})),e.Indicators&&a.createElement(g,{key:"indicators"},a.createElement(e.Indicators,{id:u?void 0:k.Indicators,className:F.button,studyMarket:i,displayMode:s}),S.hasNewHeaderToolbarStyles&&e.Templates&&a.createElement(e.Templates,{id:u?void 0:k.StudyTemplates,isShownQuicks:t.allowFavoriting,isFavoritingAllowed:t.allowFavoriting,displayMode:s})),!S.hasNewHeaderToolbarStyles&&e.Templates&&a.createElement(g,{key:"templates"},a.createElement(e.Templates,{id:u?void 0:k.StudyTemplates,isShownQuicks:t.allowFavoriting,isFavoritingAllowed:t.allowFavoriting,displayMode:s})),e.Alert&&a.createElement(g,{key:"alert"},a.createElement(e.Alert,{id:u?void 0:k.Alerts,className:F.button,displayMode:s}),S.hasNewHeaderToolbarStyles&&e.Replay&&a.createElement(e.Replay,{id:u?void 0:k.Replay,className:F.button,displayMode:s})),e.AlertReferral&&a.createElement(g,{key:"alert-referral"},a.createElement(e.AlertReferral,{className:F.button,displayMode:s})),!S.hasNewHeaderToolbarStyles&&e.Replay&&a.createElement(g,{key:"replay"},a.createElement(e.Replay,{id:u?void 0:k.Replay,className:F.button,displayMode:s})),!S.hasNewHeaderToolbarStyles&&e.UndoRedo&&a.createElement(g,{key:"undo-redo"},a.createElement(e.UndoRedo,{id:u?void 0:k.UndoRedo})),e.ScalePercentage&&a.createElement(g,{key:"percentage"},a.createElement(e.ScalePercentage,null)),e.ScaleLogarithm&&a.createElement(g,{key:"logarithm"},a.createElement(e.ScaleLogarithm,null)),...w]),function(e){const t=e.findIndex(e=>a.isValidElement(e)&&!!e.key&&-1!==e.key.toString().indexOf("view-only-badge"));return[t].filter(e=>e>=0).forEach(t=>{e=a.Children.map(e,(e,s)=>{if(a.isValidElement(e)){switch([t-1,t,t+1].indexOf(s)){case 0:const t={noRightDecoration:!0};e=a.cloneElement(e,t);break;case 1:const s={noLeftDecoration:!0,noRightDecoration:!0};e=a.cloneElement(e,s);break;case 2:const r={noLeftDecoration:!0};e=a.cloneElement(e,r)}}return e})}),e
}(a.Children.toArray([o&&a.createElement(g,{key:"view-only-badge",removeSeparator:S.hasNewHeaderToolbarStyles},a.createElement(R,null)),a.createElement(g,{key:"gap",className:n(F.fill,u&&F.collapse),removeSeparator:S.hasNewHeaderToolbarStyles}),S.hasNewHeaderToolbarStyles&&!o&&e.UndoRedo&&a.createElement(g,{key:"undo-redo",removeSeparator:!0},a.createElement(e.UndoRedo,{id:u?void 0:k.UndoRedo})),(!o||S.hasNewHeaderToolbarStyles)&&e.Layout&&a.createElement(g,{key:"layout",removeSeparator:S.hasNewHeaderToolbarStyles&&o},!o&&a.createElement(e.Layout,{id:u?void 0:k.Layouts}),S.hasNewHeaderToolbarStyles&&e.SaveLoad&&a.createElement(e.SaveLoad,{id:u?void 0:k.SaveLoad,chartSaver:r,isReadOnly:o,displayMode:s,isFake:u,stateSyncEmitter:l})),!S.hasNewHeaderToolbarStyles&&e.SaveLoad&&a.createElement(g,{key:"save-load-right"},a.createElement(e.SaveLoad,{id:u?void 0:k.SaveLoad,chartSaver:r,isReadOnly:o,displayMode:s,isFake:u,stateSyncEmitter:l})),e.SaveLoadReferral&&a.createElement(g,{key:"save-load-referral"},a.createElement(e.SaveLoadReferral,{isReadOnly:o,displayMode:s})),t.showLaunchInPopupButton&&e.OpenPopup&&a.createElement(g,{key:"popup"},a.createElement(e.OpenPopup,null)),(!o||S.hasNewHeaderToolbarStyles)&&e.Properties&&a.createElement(g,{key:"properties",removeSeparator:S.hasNewHeaderToolbarStyles&&o},!o&&a.createElement(e.Properties,{id:u?void 0:k.Properties,className:F.iconButton}),S.hasNewHeaderToolbarStyles&&a.createElement(a.Fragment,null,!o&&e.Fullscreen&&a.createElement(e.Fullscreen,{id:u?void 0:k.Fullscreen}),e.Screenshot&&a.createElement(e.Screenshot,{id:u?void 0:k.Screenshot,className:F.iconButton}))),!S.hasNewHeaderToolbarStyles&&!o&&e.Fullscreen&&a.createElement(g,{key:"fullscreen",onClick:this._trackFullscreenButtonClick},a.createElement(e.Fullscreen,{id:u?void 0:k.Fullscreen})),!S.hasNewHeaderToolbarStyles&&e.Screenshot&&a.createElement(g,{key:"screenshot"},a.createElement(e.Screenshot,{id:u?void 0:k.Screenshot,className:F.iconButton})),!o&&e.Publish&&a.createElement(g,{key:"publish",className:F.mobilePublish,removeSeparator:S.hasNewHeaderToolbarStyles},a.createElement(e.Publish,{id:u?void 0:k.PublishMobile})),..._]))))))),e.Publish&&!o&&!u&&a.createElement(e.Publish,{id:k.PublishDesktop,className:F.desktopPublish}))}_onLoginStateChange(){0}_trackFullscreenButtonClick(){0}}L.contextType=V;var D=s(52714),H=s.n(D),A=s(9127);class B extends A.CommonJsonStoreService{constructor(e,t,s=[]){super(e,t,"FAVORITE_CHART_STYLES_CHANGED","StyleWidget.quicks",s)}}var P=s(9315),x=s(96397);class z extends A.AbstractJsonStoreService{constructor(e,t,s){super(e,t,"FAVORITE_INTERVALS_CHANGED","IntervalWidget.quicks",s)}_serialize(e){return(0,x.uniq)(e.map(P.normalizeIntervalString))}_deserialize(e){return(0,x.uniq)((0,P.convertResolutionsFromSettings)(e).filter(P.isResolutionMultiplierValid).map(P.normalizeIntervalString))}}var O=s(82992),q=s(2872),K=s.n(q),U=s(56840),Q=s(21097);class X extends A.AbstractJsonStoreService{constructor(e,t,s=[]){super(e,t,"CUSTOM_INTERVALS_CHANGED","IntervalWidget.intervals",s)}set(e,t){e.length,
this.get().length,super.set(e,t)}_serialize(e){return(0,x.uniq)(e.map(P.normalizeIntervalString))}_deserialize(e){return(0,x.uniq)((0,P.convertResolutionsFromSettings)(e).filter(P.isResolutionMultiplierValid).map(P.normalizeIntervalString))}}const G=new X(Q.TVXWindowEvents,U);var J=s(53374);class Z{constructor(e){this._customIntervalsService=G,this._supportedIntervalsMayChange=new(K()),this._fireSupportedIntervalsMayChange=()=>{this._supportedIntervalsMayChange.fire()},this._chartApiInstance=e,O.linking.supportedResolutions.subscribe(this._fireSupportedIntervalsMayChange),O.linking.range.subscribe(this._fireSupportedIntervalsMayChange),O.linking.seconds.subscribe(this._fireSupportedIntervalsMayChange),O.linking.ticks.subscribe(this._fireSupportedIntervalsMayChange),O.linking.intraday.subscribe(this._fireSupportedIntervalsMayChange)}destroy(){O.linking.supportedResolutions.unsubscribe(this._fireSupportedIntervalsMayChange),O.linking.range.unsubscribe(this._fireSupportedIntervalsMayChange),O.linking.seconds.unsubscribe(this._fireSupportedIntervalsMayChange),O.linking.ticks.unsubscribe(this._fireSupportedIntervalsMayChange),O.linking.intraday.unsubscribe(this._fireSupportedIntervalsMayChange)}getDefaultIntervals(){return null===this._chartApiInstance?[]:this._chartApiInstance.defaultResolutions().map(P.normalizeIntervalString)}getCustomIntervals(){return this._customIntervalsService.get()}add(e,t,s){if(!this.isValidInterval(e,t))return null;const a=(0,P.normalizeIntervalString)(`${e}${t}`),r=this.getCustomIntervals();return this._isIntervalDefault(a)||r.includes(a)?null:(this._customIntervalsService.set((0,P.sortResolutions)([...r,a])),a)}remove(e){this._customIntervalsService.set(this.getCustomIntervals().filter(t=>t!==e))}isValidInterval(e,t){return(0,P.isResolutionMultiplierValid)(`${e}${t}`)}isSupportedInterval(e){return(0,P.isAvailable)(e)}supportedIntervalsMayChange(){return this._supportedIntervalsMayChange}getOnChange(){return this._customIntervalsService.getOnChange()}getPossibleIntervals(){return J.INTERVALS}getResolutionUtils(){return{getMaxResolutionValue:P.getMaxResolutionValue,getTranslatedResolutionModel:P.getTranslatedResolutionModel,mergeResolutions:P.mergeResolutions,sortResolutions:P.sortResolutions}}_isIntervalDefault(e){return this.getDefaultIntervals().includes(e)}}var $=s(18387),j=s(88145),Y=s(14905);const ee={};let te=null;class se{constructor(e=U){this._favorites=[],this._favoritesChanged=new(K()),this._settings=e,Q.TVXWindowEvents.on("StudyFavoritesChanged",e=>{const t=JSON.parse(e);this._loadFromState(t.favorites||[])}),this._settings.onSync.subscribe(this,this._loadFavs),this._loadFavs()}isFav(e){const t=this.favId(e);return-1!==this._findFavIndex(t)}toggleFavorite(e){this.isFav(e)?this.removeFavorite(e):this.addFavorite(e)}addFavorite(e){const t=this.favId(e);this._favorites.push(re(t)),this._favoritesChanged.fire(),this._saveFavs()}removeFavorite(e){const t=this.favId(e),s=this._findFavIndex(t);-1!==s&&(this._favorites.splice(s,1),this._favoritesChanged.fire()),this._saveFavs()}favId(e){
return(0,Y.isPineIdString)(e)?e:(0,Y.extractPineId)(e)||(0,j.extractStudyId)(e)}favorites(){return this._favorites}favoritePineIds(){return this._favorites.filter(e=>"pine"===e.type).map(e=>e.pineId)}favoritesChanged(){return this._favoritesChanged}static getInstance(){return null===te&&(te=new se),te}static create(e){return new se(e)}_loadFavs(){const e=this._settings.getJSON("studyMarket.favorites",[]);this._loadFromState(e)}_saveFavs(){const e=this._stateToSave();this._settings.setJSON("studyMarket.favorites",e,{forceFlush:!0}),Q.TVXWindowEvents.emit("StudyFavoritesChanged",JSON.stringify({favorites:e}))}_stateToSave(){return this._favorites.map(ae)}_loadFromState(e){this._favorites=e.map(e=>re(function(e){return e in ee?ee[e]:e}(e))),this._favoritesChanged.fire()}_findFavIndex(e){return this._favorites.findIndex(t=>e===ae(t))}}function ae(e){return"java"===e.type?e.studyId:e.pineId}function re(e){return(0,Y.isPineIdString)(e)?{type:"pine",pineId:e}:{type:"java",studyId:e}}var ie=s(29823);const ne={[ie.ResolutionKind.Ticks]:!1,[ie.ResolutionKind.Seconds]:!1,[ie.ResolutionKind.Minutes]:!1,[ie.SpecialResolutionKind.Hours]:!1,[ie.ResolutionKind.Days]:!1,[ie.ResolutionKind.Range]:!1};class oe extends A.CommonJsonStoreService{constructor(e,t,s=ne){super(e,t,"INTERVALS_MENU_VIEW_STATE_CHANGED","IntervalWidget.menu.viewState",s)}isAllowed(e){return Object.keys(ne).includes(e)}}var le=s(22668);const ce={Area:3,Bars:0,Candles:1,"Heiken Ashi":8,"Hollow Candles":9,Line:2,Renko:4,Kagi:5,"Point & figure":6,"Line Break":7,Baseline:10},de=["1","30","60"];function he(e=[]){let t=e.map(e=>ce[e])||[1,4,5,6];return d.enabled("widget")&&(t=[0,1,3]),t}function ue(e=[]){return(0,P.mergeResolutions)(e,d.enabled("star_some_intervals_by_default")?de:[])}new z(Q.TVXWindowEvents,U,ue()),new B(Q.TVXWindowEvents,U,he()),new le.FavoriteStudyTemplateService(Q.TVXWindowEvents,U);const me={tools:u.any.isRequired,isFundamental:u.any,chartApiInstance:u.any,availableTimeFrames:u.any,chartWidgetCollection:u.any,windowMessageService:u.any,favoriteChartStylesService:u.any,favoriteIntervalsService:u.any,intervalService:u.any,favoriteStudyTemplatesService:u.any,studyTemplates:u.any,chartChangesWatcher:u.any,saveChartService:u.any,sharingChartService:u.any,loadChartService:u.any,chartWidget:u.any,favoriteScriptsModel:u.any,intervalsMenuViewStateService:u.any,templatesMenuViewStateService:u.any,financialsDialogController:u.any,snapshotUrl:u.any};var pe=s(62046),ve=s(85291);const Se=[];class fe extends a.PureComponent{constructor(e){super(e),this._saveLoadSyncEmitter=new(l()),this._handleFullWidthChange=e=>{this._fullWidth=e,this.setState({measureValid:!1})},this._handleFavoritesWidthChange=e=>{this._favoritesWidth=e,this.setState({measureValid:!1})},this._handleCollapseWidthChange=e=>{this._collapseWidth=e,this.setState({measureValid:!1})},this._handleMeasure=e=>{this.setState({availableWidth:e,measureValid:!1})}
;const{tools:t,windowMessageService:s,chartWidgetCollection:a,chartApiInstance:r,availableTimeFrames:n,isFundamental:o,favoriteIntervalsService:h,favoriteChartStylesService:u,favoriteStudyTemplatesService:m,studyTemplates:p,saveChartService:v,sharingChartService:S,loadChartService:f,financialsDialogController:g,snapshotUrl:y}=e;this._showScrollbarWhen=(0,i.ensureDefined)(e.allowedModes).slice(-1),this._panelWidthChangeHandlers={full:this._handleFullWidthChange,medium:this._handleFavoritesWidthChange,small:this._handleCollapseWidthChange};const{chartChangesWatcher:b}=e;this._chartChangesWatcher=b;const w=he(this.props.defaultFavoriteStyles);this._favoriteChartStylesService=u||new B(Q.TVXWindowEvents,U,w);const _=ue(this.props.defaultFavoriteIntervals);this._favoriteIntervalsService=h||new z(Q.TVXWindowEvents,U,_),this._intervalsMenuViewStateService=new oe(Q.TVXWindowEvents,U),this._intervalService=new Z(r),this._registry={tools:t,isFundamental:o,chartWidgetCollection:a,windowMessageService:s,chartApiInstance:r,availableTimeFrames:n,favoriteStudyTemplatesService:m,studyTemplates:p,saveChartService:v,sharingChartService:S,loadChartService:f,intervalsMenuViewStateService:this._intervalsMenuViewStateService,favoriteChartStylesService:this._favoriteChartStylesService,favoriteIntervalsService:this._favoriteIntervalsService,intervalService:this._intervalService,chartChangesWatcher:this._chartChangesWatcher,chartWidget:a.activeChartWidget.value(),favoriteScriptsModel:se.getInstance(),templatesMenuViewStateService:this._templatesMenuVuewStateService,financialsDialogController:g,snapshotUrl:y},this.state={isVisible:!0,availableWidth:0,displayMode:"full",measureValid:!1,leftCustomElements:[],rightCustomElements:[]},this._readOnly=a.readOnly(),this._features={allowFavoriting:d.enabled("items_favoriting"),showIdeasButton:Boolean(this.props.ideas),showLaunchInPopupButton:Boolean(this.props.popupButton),allowSymbolSearchSpread:d.enabled("header_symbol_search")&&d.enabled("show_spread_operators"),allowToolbarHiding:d.enabled("collapsible_header")},this._setDisplayMode=(0,c.default)(this._setDisplayMode,100),this._negotiateResizer()}componentDidUpdate(e,t){const{isVisible:s,measureValid:a}=this.state;s!==t.isVisible&&(h.emit("toggle_header",s),this._negotiateResizer()),a||this._setDisplayMode()}render(){const{resizerBridge:e,allowedModes:t,...s}=this.props,{displayMode:r,isVisible:o,leftCustomElements:l,rightCustomElements:c}=this.state,d={features:this._features,readOnly:this._readOnly,isFake:!1,saveLoadSyncEmitter:this._saveLoadSyncEmitter,leftCustomElements:l,rightCustomElements:c,...s},h={...d,isFake:!0,showScrollbarWhen:Se},u=(0,i.ensureDefined)(t),m=this.props.tools.PublishButtonManager||a.Fragment;return a.createElement(W.RegistryProvider,{value:this._registry,validation:me},a.createElement(m,null,a.createElement("div",{className:n(ve.toolbar,{[ve.isHidden]:!o}),onClick:this.props.onClick},a.createElement("div",{className:ve.overflowWrap},a.createElement(L,{key:"live",showScrollbarWhen:this._showScrollbarWhen,displayMode:r,
onAvailableSpaceChange:this._handleMeasure,...d}),u.map(e=>a.createElement(L,{key:e,displayMode:e,onWidthChange:this._panelWidthChangeHandlers[e],...h}))))))}addButton(e,t){if(!t.useTradingViewStyle)return this._addCustomHTMLButton(e,t.align);this._addCustomTradingViewStyledButton(e,t)}addDropdown(e,t){const{leftCustomElements:s,rightCustomElements:a}=this.state,r={type:"Dropdown",id:e,params:t};"left"===t.align?this.setState({leftCustomElements:[...s,r]}):this.setState({rightCustomElements:[...a,r]})}updateDropdown(e,t){const s=t=>"Dropdown"===t.type&&t.id===e,a=this.state.leftCustomElements.find(s)||this.state.rightCustomElements.find(s);void 0!==a&&(a.params={...a.params,...t},this.setState({leftCustomElements:this.state.leftCustomElements.slice(),rightCustomElements:this.state.rightCustomElements.slice()}))}removeDropdown(e){const t=t=>"Dropdown"===t.type&&t.id!==e,s=this.state.leftCustomElements.filter(t),a=this.state.rightCustomElements.filter(t);this.setState({leftCustomElements:s,rightCustomElements:a})}_negotiateResizer(){this.props.resizerBridge.negotiateHeight(this.state.isVisible?$.HEADER_TOOLBAR_HEIGHT_EXPANDED:$.HEADER_TOOLBAR_HEIGHT_COLLAPSED)}_setDisplayMode(){const{availableWidth:e}=this.state,{allowedModes:t}=this.props,s={full:this._fullWidth,medium:this._favoritesWidth,small:this._collapseWidth},a=(0,i.ensureDefined)(t);let r=a.map(e=>s[e]).findIndex(t=>e>=t);-1===r&&(r=a.length-1);const n=a[r];this.setState({measureValid:!0,displayMode:n})}_addCustomHTMLButton(e,t="left"){const s=new(H())(0),a=(0,pe.parseHtmlElement)(`<div class="apply-common-tooltip ${ve.customButton}">`),r={type:"Button",id:e,params:{key:Number(new Date),element:a,width:s}};return this._addCustomElementToState(t,r),a}_addCustomTradingViewStyledButton(e,t){const s={type:"TradingViewStyledButton",id:e,params:{key:Number(new Date),text:t.text,title:t.title,onClick:t.onClick}};this._addCustomElementToState(t.align,s)}_addCustomElementToState(e,t){const{leftCustomElements:s,rightCustomElements:a}=this.state;"left"===e?this.setState({leftCustomElements:[...s,t]}):this.setState({rightCustomElements:[...a,t]})}}fe.defaultProps={allowedModes:["full","medium"]};class ge{constructor(e,t){this._component=null,this._handleRef=e=>{this._component=e},this._container=e,r.render(a.createElement(fe,{...t,ref:this._handleRef}),this._container)}destroy(){r.unmountComponentAtNode(this._container)}getComponent(){return(0,i.ensureNotNull)(this._component)}}},37669:(e,t,s)=>{"use strict";s.d(t,{hasNewHeaderToolbarStyles:()=>a});s(67337);const a=!1},55402:(e,t,s)=>{"use strict";s.d(t,{validateRegistry:()=>o,RegistryProvider:()=>l,registryContextType:()=>c});var a=s(59496),r=s(19036),i=s.n(r);const n=a.createContext({});function o(e,t){i().checkPropTypes(t,e,"context","RegistryContext")}function l(e){const{validation:t,value:s}=e;return o(s,t),a.createElement(n.Provider,{value:s},e.children)}function c(){return n}},42142:(e,t,s)=>{"use strict";s.d(t,{FragmentMap:()=>r});var a=s(59496);function r(e){if(e.map){
return a.Children.toArray(e.children).map(e.map)}return e.children}},70412:(e,t,s)=>{"use strict";s.d(t,{hoverMouseEventFilter:()=>i,useAccurateHover:()=>n,useHover:()=>r});var a=s(59496);function r(){const[e,t]=(0,a.useState)(!1);return[e,{onMouseOver:function(e){i(e)&&t(!0)},onMouseOut:function(e){i(e)&&t(!1)}}]}function i(e){return!e.currentTarget.contains(e.relatedTarget)}function n(e){const[t,s]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{const t=t=>{if(null===e.current)return;const a=e.current.contains(t.target);s(a)};return document.addEventListener("mouseover",t),()=>document.removeEventListener("mouseover",t)},[]),t}},39440:(e,t,s)=>{"use strict";s.d(t,{HorizontalScroll:()=>y});var a=s(59496),r=s(97754),i=s(9837),n=s(88537),o=s(9745),l=s(59199),c=s(68587),d=s(62820),h=s(33086),u=s(41814);const m={isVisibleScrollbar:!0,shouldMeasure:!0,hideButtonsFrom:1};function p(e){return a.createElement("div",{className:r(u.fadeLeft,e.className,{[u.isVisible]:e.isVisible})})}function v(e){return a.createElement("div",{className:r(u.fadeRight,e.className,{[u.isVisible]:e.isVisible})})}function S(e){return a.createElement(g,{...e,className:u.scrollLeft})}function f(e){return a.createElement(g,{...e,className:u.scrollRight})}function g(e){return a.createElement("div",{className:r(e.className,{[u.isVisible]:e.isVisible}),onClick:e.onClick},a.createElement("div",{className:u.iconWrap},a.createElement(o.Icon,{icon:h,className:u.icon})))}const y=function(e=S,t=f,s=p,o=v){var h;return(h=class extends a.PureComponent{constructor(e){super(e),this._scroll=a.createRef(),this._wrapMeasureRef=a.createRef(),this._contentMeasureRef=a.createRef(),this._handleScrollLeft=()=>{if(this.props.onScrollButtonClick)return void this.props.onScrollButtonClick("left");const e=this.props.scrollStepSize||this.state.widthWrap-50;this.animateTo(Math.max(0,this.currentPosition()-e))},this._handleScrollRight=()=>{if(this.props.onScrollButtonClick)return void this.props.onScrollButtonClick("right");const e=this.props.scrollStepSize||this.state.widthWrap-50;this.animateTo(Math.min((this.state.widthContent||0)-(this.state.widthWrap||0),this.currentPosition()+e))},this._handleResizeWrap=e=>{this.props.onMeasureWrap&&this.props.onMeasureWrap(e),this.setState({widthWrap:e.width}),this._checkButtonsVisibility()},this._handleResizeContent=e=>{this.props.onMeasureContent&&this.props.onMeasureContent(e);const{shouldDecreaseWidthContent:t,buttonsWidthIfDecreasedWidthContent:s}=this.props;t&&s?this.setState({widthContent:e.width+2*s}):this.setState({widthContent:e.width})},this._handleScroll=()=>{const{onScroll:e}=this.props;e&&e(this.currentPosition(),this.isAtLeft(),this.isAtRight()),this._checkButtonsVisibility()},this._checkButtonsVisibility=()=>{const{isVisibleLeftButton:e,isVisibleRightButton:t}=this.state,s=this.isAtLeft(),a=this.isAtRight();s||e?s&&e&&this.setState({isVisibleLeftButton:!1}):this.setState({isVisibleLeftButton:!0}),a||t?a&&t&&this.setState({isVisibleRightButton:!1}):this.setState({isVisibleRightButton:!0})},this.state={widthContent:0,
widthWrap:0,isVisibleRightButton:!1,isVisibleLeftButton:!1}}componentDidMount(){this._checkButtonsVisibility()}componentDidUpdate(e,t){t.widthWrap===this.state.widthWrap&&t.widthContent===this.state.widthContent||this._handleScroll(),this.props.shouldMeasure&&this._wrapMeasureRef.current&&this._contentMeasureRef.current&&(this._wrapMeasureRef.current.measure(),this._contentMeasureRef.current.measure())}currentPosition(){return this._scroll.current?(0,d.isRtl)()?(0,d.getLTRScrollLeft)(this._scroll.current):this._scroll.current.scrollLeft:0}isAtLeft(){return!this._isOverflowed()||this.currentPosition()<=(0,n.ensureDefined)(this.props.hideButtonsFrom)}isAtRight(){return!this._isOverflowed()||this.currentPosition()+this.state.widthWrap>=this.state.widthContent-(0,n.ensureDefined)(this.props.hideButtonsFrom)}animateTo(e,t=c.dur){const s=this._scroll.current;s&&((0,d.isRtl)()&&(e=(0,d.getLTRScrollLeftOffset)(s,e)),t<=0?s.scrollLeft=Math.round(e):(0,l.doAnimate)({onStep(e,t){s.scrollLeft=Math.round(t)},from:s.scrollLeft,to:Math.round(e),easing:c.easingFunc.easeInOutCubic,duration:t}))}render(){const{children:n,isVisibleScrollbar:l,isVisibleFade:c,isVisibleButtons:d,shouldMeasure:h,shouldDecreaseWidthContent:m,buttonsWidthIfDecreasedWidthContent:p,onMouseOver:v,onMouseOut:S,scrollWrapClassName:f,fadeClassName:g}=this.props,{isVisibleRightButton:y,isVisibleLeftButton:b}=this.state,w=m&&p;return a.createElement(i,{whitelist:["width"],onMeasure:this._handleResizeWrap,shouldMeasure:h,ref:this._wrapMeasureRef},a.createElement("div",{className:u.wrapOverflow,onMouseOver:v,onMouseOut:S},a.createElement("div",{className:r(u.wrap,w?u.wrapWithArrowsOuting:"")},a.createElement("div",{className:r(u.scrollWrap,f,{[u.noScrollBar]:!l}),onScroll:this._handleScroll,ref:this._scroll},a.createElement(i,{onMeasure:this._handleResizeContent,whitelist:["width"],shouldMeasure:h,ref:this._contentMeasureRef},n)),c&&a.createElement(s,{isVisible:b,className:g}),c&&a.createElement(o,{isVisible:y,className:g}),d&&a.createElement(e,{onClick:this._handleScrollLeft,isVisible:b}),d&&a.createElement(t,{onClick:this._handleScrollRight,isVisible:y}))))}_isOverflowed(){const{widthContent:e,widthWrap:t}=this.state;return e>t}}).defaultProps=m,h}(S,f,p,v)},33086:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10" width="20" height="10"><path fill="none" stroke="currentColor" stroke-width="1.5" d="M2 1l8 8 8-8"/></svg>'},59266:e=>{
e.exports='<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path fill="currentColor" fill-rule="evenodd" d="M4.56 14a10.05 10.05 0 00.52.91c.41.69 1.04 1.6 1.85 2.5C8.58 19.25 10.95 21 14 21c3.05 0 5.42-1.76 7.07-3.58A17.18 17.18 0 0023.44 14a9.47 9.47 0 00-.52-.91c-.41-.69-1.04-1.6-1.85-2.5C19.42 8.75 17.05 7 14 7c-3.05 0-5.42 1.76-7.07 3.58A17.18 17.18 0 004.56 14zM24 14l.45-.21-.01-.03a7.03 7.03 0 00-.16-.32c-.11-.2-.28-.51-.5-.87-.44-.72-1.1-1.69-1.97-2.65C20.08 7.99 17.45 6 14 6c-3.45 0-6.08 2-7.8 3.92a18.18 18.18 0 00-2.64 3.84v.02h-.01L4 14l-.45-.21-.1.21.1.21L4 14l-.45.21.01.03a5.85 5.85 0 00.16.32c.11.2.28.51.5.87.44.72 1.1 1.69 1.97 2.65C7.92 20.01 10.55 22 14 22c3.45 0 6.08-2 7.8-3.92a18.18 18.18 0 002.64-3.84v-.02h.01L24 14zm0 0l.45.21.1-.21-.1-.21L24 14zm-10-3a3 3 0 100 6 3 3 0 000-6zm-4 3a4 4 0 118 0 4 4 0 01-8 0z"/></svg>'}}]);