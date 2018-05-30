import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

// APP
import { App } from './app.component';
import { Icons } from './app.icons';

// CONSTANTS
import { VIEWS } from '../constants/views';

// PAGES
import { AdminPage } from '../pages/admin/admin';
import { LoginPage } from '../pages/auth/login/login';
import { RegisterPage } from '../pages/auth/register/register';
import { ChangePasswordPage } from '../pages/auth/change_password/change_password';
import { MainPage } from '../pages/main/main';
import { MatesPage } from '../pages/mates/mates';
import { GamesPage } from '../pages/games/games';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { TournamentPage } from '../pages/tournaments/tournament/tournament';
import { RankingsPage } from '../pages/rankings/rankings';
import { GlobalRankingsPage } from '../pages/rankings/global/rankings.global';
import { MatesRankingsPage } from '../pages/rankings/mates/rankings.mates';
import { SettingsPage } from '../pages/settings/settings';
import { InvitePage } from '../pages/invite/invite';
import { LobbyPage } from '../pages/lobby/lobby';
import { GamePage } from '../pages/game/overview/overview';
import { TrickPage } from '../pages/game/trick/trick';
import { DefensePage } from '../pages/game/defense/defense';
import { ReportPage } from '../pages/games/report/report';

// COMPONENTS
import { List } from '../components/lists/list';
import { ListItem } from '../components/lists/item/list-item';
import { ListExtendable } from '../components/lists/extendable/list-extendable';
import { Sidebar } from '../components/sidebar/sidebar';
import { Overlay } from '../components/overlay/overlay';
import { Content } from '../components/content/content';
import { Dialog } from '../components/dialog/dialog';
import { Board } from '../components/board/board';
import { Letters } from '../components/letters/letters';
import { Trick } from '../components/trick/trick';
import { Tabs } from '../components/tabs/tabs';
import { Tab } from '../components/tabs/tab';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { Search } from '../components/search/search';
import { Col } from '../components/grid/col';
import { Row } from '../components/grid/row';

// SERVICES
import { SharedService } from '../services/shared.service';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { SocketService } from '../services/socket.service';
import { MatesService } from '../services/mates.service';
import { TrickService } from '../services/trick.service';
import { DialogService } from '../services/dialog.service';
import { LobbyService } from '../services/lobby.service';
import { PushService } from '../services/push.service';

import { GameService } from '../services/game/game.main.service';
import { GameActionsService } from '../services/game/game.actions.service';
import { GameStorageService } from '../services/game/game.storage.service';
import { GameRoutesService } from '../services/game/game.routes.service';
import { GameListenersService } from '../services/game/game.listeners.service';

// PIPES
import { OrderPipe } from '../pipes/order.pipe';
import { TrickPipe } from '../pipes/trick.pipe';
import { KeysPipe } from '../pipes/keys.pipe';

@NgModule({
  declarations: [
    App,

    AdminPage,
    LoginPage,
    RegisterPage,
    ChangePasswordPage,
    MainPage,
    MatesPage,
    GamesPage,
    TournamentsPage,
    TournamentPage,
    RankingsPage,
    GlobalRankingsPage,
    MatesRankingsPage,
    SettingsPage,
    InvitePage,
    LobbyPage,
    GamePage,
    TrickPage,
    DefensePage,
    ReportPage,

    List,
    ListItem,
    ListExtendable,
    Sidebar,
    Overlay,
    Content,
    Dialog,
    Board,
    Letters,
    Trick,
    Tabs,
    Tab,
    Header,
    Footer,
    Search,
    Col,
    Row,
    OrderPipe,
    TrickPipe,
    KeysPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(VIEWS.routes),
    ChartsModule,
    Icons,
  ],
  providers: [
    SharedService,
    AuthService,
    DataService,
    SocketService,
    MatesService,
    GameService,
    TrickService,
    LobbyService,
    PushService,
    DialogService,
    GameActionsService,
    GameStorageService,
    GameRoutesService,
    GameListenersService,
  ],
  bootstrap: [App],
  entryComponents: [GlobalRankingsPage, MatesRankingsPage, Dialog],
})
export class AppModule {}
