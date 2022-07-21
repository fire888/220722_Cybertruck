const BLUE = "#333399"
const RED = "#AA0011"
const GREEN = "#117711"
const GREEN2 = "#010407"
const GREEN0 = "#00ffc3"
const YELLOW = "#776611"
export const BLACK = "#22223F"
export const WHITE = "#ffffff";
const SIZE = [220, 120]
const SIZE2 = [450, 120]
export const LABEL_OFFSET_Y = .2



export const CROSS_DATA = {
    /** left right */
    'path01': ['path002', 'path_l012'],
    'path002': ['path_l013', 'path01', 'path003'],
    'path003': ['path002', 'path_l014', 'path004'],
    'path004': ['path003', 'path_l015', 'path005'],
    'path005': ['path004', 'path_l016', 'path020'],
    'path020': ['path005', 'path021', 'path006'],
    'path006': ['path007', 'path020', 'path027', 'path013'],
    'path007': ['path006', 'path_l018', 'path008',],
    'path008': ['path007', 'path_l019', 'path009',],
    'path009': ['path008', 'path_l020', 'path010',],
    'path010': ['path009', 'path_l021', 'path011',],
    'path011': ['path010', 'path_l022', 'path012',],
    'path012': ['path011', 'path_l023',],

    'path_l012': ['path01'],
    'path_l013': ['path002'],
    'path_l014': ['path003'],
    'path_l015': ['path004'],
    'path_l016': ['path005'],
    'path_l018': ['path007'],
    'path_l019': ['path008'],
    'path_l020': ['path009'],
    'path_l021': ['path010'],
    'path_l022': ['path011'],
    'path_l023': ['path012'],

    /** enter */
    'path013': ['path006', 'path014',],
    'path014': ['path013', 'path015',],
    'path015': ['path014', 'path016',],
    'path016': ['path015', 'path017', 'path_g'],
    'path017': ['path016', 'path018'],
    'path018': ['path017', 'path036'],
    'path036': ['path018', 'path_l000'],
    'path_g': ['path016'],
    'path_l000': ['path036'],

    /** stair */
    'path021' : ['path020', 'path022'],
    'path022' : ['path021', 'path023'],
    'path023' : ['path022', 'path024'],
    'path024' : ['path023', 'path025'],
    'path025' : ['path024', 'path026'],
    'path026' : ['path025', 'path_l024'],

    /** back */
    'path027': ['path006', 'path028', 'path117'],
    'path028': ['path027', 'path_l025'], // lift
    'path_l025': ['path028'],
    'path117': ['path027', 'path118', 'path126'],
    'path126': ['path117', 'path_l127', 'path027'], // 117
    'path_l127': ['path126'], // 117
    'path118': ['path117', 'path119', 'path127'],
    'path127': ['path118', 'path_l128'], //116
    'path_l128': ['path127'],
    'path119': ['path118', 'path120', 'path128'],
    'path128': ['path119', 'path_l129'], //115
    'path_l129': ['path128'],
    'path120': ['path119', 'path121', 'path129', 'path130'],
    'path129': ['path120', 'path_l130'], //114
    'path_l130': ['path129'],
    'path130': ['path120', 'path_l131'], //118
    'path_l131': ['path130'], //118
    'path121': ['path120', 'path122', 'path131', 'path132'],
    'path131': ['path121','path_l132'], //123
    'path_l132': ['path121'], //123
    'path132': ['path121', 'path_l133'], //119
    'path_l133': ['path132'], //119
    'path122': ['path121', 'path133', 'path123', 'path134'],
    'path133': ['path122', 'path_l134'], //122
    'path_l134': ['path133'], //122
    'path134': ['path122', 'path135', 'path136'],
    'path135': ['path134', 'path_l135'], //121
    'path_l135': ['path135'],
    'path136': ['path134', 'path137'],
    'path137': ['path136', 'path_l136'],  // 120
    'path_l136': ['path137'],  // 120
    'path123': ['path122', 'path124', 'path138'],
    'path138': ['path123', 'path_l026'],
    'path_l026': ['path138'],
    'path124': ['path123', 'path033'],
    'path033': ['path123', 'path034'],
    'path034': ['path033', 'path035'],
    'path035': ['path034', 'path_l027'], // exit2
    'path_l027': ['path035'],

    /** SECOND_FLOOR */
    'path_l024': ['path026', 'path100', 'path107'],
    'path100': ['path_l024', 'path101', 'path158'],
    'path101': ['path100', 'path_l100', 'path102'],
    'path102': ['path101', 'path_l103', 'path104'],
    'path104': ['path102', 'path_l105', 'path105'],
    'path105': ['path_l106', 'path104', 'path103'],
    'path103': ['path_l104', 'path105'],
    'path158': ['path100', 'path156', 'path159'],
    'path156': ['path100', 'path139'],
    'path139': ['path156', 'path157'],
    'path157': ['path139', 'path141'],
    'path141': ['path157', 'path142'], //210
    'path142': ['path141', 'path143'], //209
    'path143': ['path142', 'path144'],
    'path144': ['path143', 'path145'],
    'path145': ['path144', 'path146'],
    'path146': ['path145', 'path147'],
    'path147': ['path146', 'path148'],
    'path148': ['path147', 'path149'],
    'path149': ['path148', 'path150'],
    'path150': ['path149', 'path151'],
    'path151': ['path150', 'path152'],
    'path152': ['path151', 'path153'],
    'path153': ['path152', 'path154'],
    'path154': ['path153'],

    'path159': ['path158', 'path160'],
    'path160': ['path159', 'path161'], // lift2
    'path161': ['path160', 'path162'],
    'path162': ['path161', 'path163'],
    'path163': ['path162', 'path164'], //217
    'path164': ['path163', 'path165'],
    'path165': ['path164', 'path166'],
    'path166': ['path165', 'path167'], // 216
    'path167': ['path166', 'path168'],
    'path168': ['path167', 'path169'],
    'path169': ['path168', 'path170'], //
    'path170': ['path169', 'path171'],
    'path171': ['path170', 'path172'],
    'path172': ['path171', 'path173'], //
    'path173': ['path172', 'path174'],
    'path174': ['path173', 'path175'],
    'path175': ['path174', 'path176', 'path181'],
    'path176': ['path175', 'path177'],
    'path177': ['path176', 'path178'],
    'path178': ['path177', 'path179'],
    'path179': ['path178', 'path180'],
    'path180': ['path179'],
    'path181': ['path175', 'path182'],
    'path182': ['path181', 'path183'],
    'path183': ['path182'],

    /** stairs */
    'path107': ['path024', 'path108'],
    'path108': ['path107', 'path109'],
    'path109': ['path108', 'path110'],
    'path110': ['path109', 'path111'],
    'path111': ['path110', 'path112', 'path184'],

    'path_l105': ['path104'],
    'path_l103': ['path102'],
    'path_l100': ['path101'],
    'path_l106': ['path105'],
    'path_l104': ['path103'],

    /** THIRD FLOOR */
    'path112': ['path111', 'path_l113', 'path113'],
    'path113': ['path_l114', 'path112', 'path114'],
    'path114': ['path_l115', 'path113', 'path115'],
    'path115': ['path_l116', 'path114', 'path116'],
    'path116': ['path115', 'path_l117'],

    'path_l113': ['path112'],
    'path_l114': ['path113'],
    'path_l115': ['path114'],
    'path_l116': ['path115'],
    'path_l117': ['path116'],

    'path184': ['path111', 'path185', 'path202' ],
    'path185': ['path184', 'path186'],
    'path186': ['path185', 'path187'],
    'path187': ['path186', 'path188'],
    'path188': ['path187', 'path189'],
    'path189': ['path188', 'path190'],
    'path190': ['path189', 'path191'],
    'path191': ['path190', 'path192'],
    'path192': ['path191', 'path193'],
    'path193': ['path192', 'path194'],
    'path194': ['path193', 'path195'],
    'path195': ['path194', 'path196'],
    'path196': ['path195', 'path197'],
    'path197': ['path196', 'path198'],
    'path198': ['path197', 'path199'],
    'path199': ['path198', 'path200'],
    'path200': ['path199', 'path201'],
    'path201': ['path200'],

    'path202': ['path184', 'path203'],
    'path203': ['path202', 'path204'],
    'path204': ['path203', 'path205'],
    'path205': ['path204', 'path206'],
    'path206': ['path205', 'path207'],
    'path207': ['path206', 'path208'],
    'path208': ['path207', 'path209'],
    'path209': ['path208', 'path210'],
    'path210': ['path209', 'path211'],
    'path211': ['path210', 'path212'],
    'path212': ['path211', 'path213'],
    'path213': ['path212', 'path214'],
    'path214': ['path213', 'path215'],
    'path215': ['path214', 'path216'],
    'path216': ['path215', 'path217'],
    'path217': ['path216', 'path218'],
    'path218': ['path217', 'path219', 'path221'],
    'path219': ['path218', 'path220'],
    'path220': ['path219'],
    'path221': ['path218', 'path222'],
    'path222': ['path221', 'path223'],
    'path223': ['path222'],
}


export const LABELS_DATA = {
    'label000': { text: 'Enter', size: SIZE2, color: GREEN2, colorFont: GREEN0, pathLabel: 'path_l000', mesh: 'hidden_enter01' },
    'label027': { text: 'Enter 2', size: SIZE2, color: GREEN2, colorFont: GREEN0, pathLabel: 'path_l027', mesh: 'hidden_enter002' },
    'label017': { text: 'wardrobe', size: SIZE2, color: GREEN2, colorFont: GREEN0, pathLabel: 'path_g', mesh: 'floor01_cloackroom00' },
    'label025': { text: 'lift', size: SIZE2, color: GREEN2, colorFont: GREEN0, pathLabel: 'path_l025' },
    'label024': { text: 'stairs', size: SIZE2, color: GREEN2, colorFont: GREEN0, pathLabel: 'path_l024' },

    'label012': { text: '101', size: SIZE, color: BLUE, pathLabel: 'path_l012', mesh: 'floor01_item07' },
    'label013': { text: '102', size: SIZE, color: BLUE, pathLabel: 'path_l013', mesh: 'floor01_item06' },
    'label014': { text: '103', size: SIZE, color: BLUE, pathLabel: 'path_l014', mesh: 'floor01_item05' },
    'label015': { text: '104', size: SIZE, color: BLUE, pathLabel: 'path_l015', mesh: 'floor01_item03' },
    'label016': { text: '105', size: SIZE, color: BLUE, pathLabel: 'path_l016', mesh: 'floor01_item103' },

    'label018': { text: '106', size: SIZE, color: RED, pathLabel: 'path_l018', mesh: 'floor01_item08' },
    'label019': { text: '107', size: SIZE, color: RED, pathLabel: 'path_l019', mesh: 'floor01_item09' },
    'label020': { text: '108', size: SIZE, color: RED, pathLabel: 'path_l020', mesh: 'floor01_item10' },
    'label021': { text: '109', size: SIZE, color: RED, pathLabel: 'path_l021', mesh: 'floor01_item11' },
    'label022': { text: '110', size: SIZE, color: RED, pathLabel: 'path_l022', mesh: 'floor01_item12' },
    'label023': { text: '111', size: SIZE, color: RED, pathLabel: 'path_l023', mesh: 'floor01_item13' },

    'label026': { text: '112', size: SIZE, color: GREEN, pathLabel: 'path_l026', mesh: 'floor01_item20' },
    'label28': { text: '114', size: SIZE, color: GREEN, pathLabel: 'path_l130', mesh: 'floor01_item18' },
    'label089': { text: '115', size: SIZE, color: GREEN, pathLabel: 'path_l129', mesh: 'floor01_item17' },
    'label090': { text: '116', size: SIZE, color: GREEN, pathLabel: 'path_l128', mesh: 'floor01_item16' },
    'label091': { text: '117', size: SIZE, color: GREEN, pathLabel: 'path_l127', mesh: 'floor01_item15' },
    'label092': { text: '118', size: SIZE, color: GREEN, pathLabel: 'path_l131', mesh: 'floor01_item25' },
    'label093': { text: '119', size: SIZE, color: GREEN, pathLabel: 'path_l133', mesh: 'floor01_item24' },
    'label094': { text: '120', size: SIZE, color: GREEN, pathLabel: 'path_l136', mesh: 'floor01_item23' },
    'label095': { text: '121', size: SIZE, color: GREEN, pathLabel: 'path_l135', mesh: 'floor01_item22' },
    'label096': { text: '122', size: SIZE, color: GREEN, pathLabel: 'path_l134', mesh: 'floor01_item21' },
    'label27': { text: '123', size: SIZE, color: GREEN, pathLabel: 'path_l132', mesh: 'floor01_item19' },

    /** 2 **************************/

    'label100': { text: '200', size: SIZE, color: BLUE, pathLabel: 'path_l100', mesh: 'floor02_item108' },
    'label101': { text: '201', size: SIZE, color: BLUE, pathLabel: 'path_l103', mesh: 'floor02_item107' },
    'label102': { text: '202', size: SIZE, color: BLUE, pathLabel: 'path_l105', mesh: 'floor02_item106' },
    'label103': { text: '203', size: SIZE, color: BLUE, pathLabel: 'path_l106', mesh: 'floor02_item105' },
    'label104': { text: '204', size: SIZE, color: BLUE, pathLabel: 'path_l104', mesh: 'floor02_item104'},
    'label150': { text: '205', size: SIZE, color: RED, pathLabel: 'path154', mesh: 'floor02_item114' },
    'label151': { text: '206', size: SIZE, color: RED, pathLabel: 'path151', mesh: 'floor02_item113' },
    'label152': { text: '207', size: SIZE, color: RED, pathLabel: 'path148', mesh: 'floor02_item112' },
    'label153': { text: '208', size: SIZE, color: RED, pathLabel: 'path145', mesh: 'floor02_item111' },
    'label154': { text: '209', size: SIZE, color: RED, pathLabel: 'path142', mesh: 'floor02_item110' },
    'label155': { text: '210', size: SIZE, color: RED, pathLabel: 'path139', mesh: 'floor02_item109' },

    'label170': { text: '211', size: SIZE, color: GREEN, pathLabel: 'path183', mesh: 'floor02_item130'  },
    'label171': { text: '212', size: SIZE, color: GREEN, pathLabel: 'path176', mesh: 'floor02_item131'   },
    'label172': { text: '213', size: SIZE, color: GREEN, pathLabel: 'path178',    },
    'label173': { text: '214', size: SIZE, color: GREEN, pathLabel: 'path180', mesh: 'floor02_item138'   },
    'label174': { text: '215', size: SIZE, color: GREEN, pathLabel: 'path172', mesh: 'floor02_item137'   },
    'label175': { text: '216', size: SIZE, color: GREEN, pathLabel: 'path169', mesh: 'floor02_item136'   },
    'label176': { text: '217', size: SIZE, color: GREEN, pathLabel: 'path160', mesh: 'floor02_item163'   },
    'label177': { text: '218', size: SIZE, color: GREEN, pathLabel: 'path163', mesh: 'floor02_item134'   },
    'label178': { text: '220', size: SIZE, color: GREEN, pathLabel: 'path166', mesh: 'floor02_item133'   },
    'label179': { text: '221', size: SIZE, color: GREEN, pathLabel: 'path169', mesh: 'floor02_item162'  },
    'label180': { text: '222', size: SIZE, color: GREEN, pathLabel: 'path172', mesh: 'floor03_item169'  },

    /** 3 **************************/

    'label209': { text: '300', size: SIZE, color: BLUE, pathLabel: 'path_l113', mesh: 'floor03_item119'},
    'label208': { text: '301', size: SIZE, color: BLUE, pathLabel: 'path_l114', mesh: 'floor03_item118' },
    'label207': { text: '302', size: SIZE, color: BLUE, pathLabel: 'path_l115', mesh: 'floor03_item117'},
    'label206': { text: '303', size: SIZE, color: BLUE, pathLabel: 'path_l116', mesh: 'floor03_item116' },
    'label205': { text: '304', size: SIZE, color: BLUE, pathLabel: 'path_l117', mesh: 'floor03_item115'},

    'label250': { text: '305', size: SIZE, color: RED, pathLabel: 'path201', mesh: 'floor03_item125'},
    'label251': { text: '306', size: SIZE, color: RED, pathLabel: 'path198', mesh: 'floor03_item124'},
    'label252': { text: '307', size: SIZE, color: RED, pathLabel: 'path195', mesh: 'floor03_item123'},
    'label253': { text: '308', size: SIZE, color: RED, pathLabel: 'path192', mesh: 'floor03_item122'},
    'label254': { text: '309', size: SIZE, color: RED, pathLabel: 'path189', mesh: 'floor03_item121'},
    'label255': { text: '310', size: SIZE, color: RED, pathLabel: 'path186', mesh: 'floor03_item120'},

    'label256': { text: '311', size: SIZE, color: GREEN, pathLabel: 'path220', mesh: 'floor03_item166'},
    'label257': { text: '312', size: SIZE, color: GREEN, pathLabel: 'path218', mesh: 'floor03_item167'},
    'label258': { text: '313', size: SIZE, color: GREEN, pathLabel: 'path223', mesh: 'floor03_item168'},
    'label259': { text: '314', size: SIZE, color: GREEN, pathLabel: 'path215', mesh: 'floor03_item169'},
    'label260': { text: '315', size: SIZE, color: GREEN, pathLabel: 'path212', mesh: 'floor03_item170'},
    'label261': { text: '316', size: SIZE, color: GREEN, pathLabel: 'path209', mesh: 'floor03_item171'},
    'label262': { text: '317', size: SIZE, color: GREEN, pathLabel: 'path206', mesh: 'floor03_item172'},
    'label263': { text: '318', size: SIZE, color: GREEN, pathLabel: 'path203'},
    // 'label264': { text: '319', size: SIZE, color: GREEN, pathLabel: 'path_l117'},
    // 'label265': { text: '320', size: SIZE, color: GREEN, pathLabel: 'path_l117'},
}

export const START_CLICKS_TO_PATH = [
    { dir: 'start', label: 'label000', },
    { dir: 'end', label: 'label205' },
]


export const RED_GROUP = [
    'floor01_item08',  
    'floor01_item09',
    'floor01_item10',
    'floor01_item11',
    'floor01_item12',
    'floor01_item13',

    'floor02_item109',
    'floor02_item110',
    'floor02_item111',
    'floor02_item112',
    'floor02_item113',
    'floor02_item114',

    'floor03_item125',
    'floor03_item124',
    'floor03_item123',
    'floor03_item122',
    'floor03_item121',
    'floor03_item120',
]
export const BLUE_GROUP = [
    'floor01_item103',
    'floor01_item03',
    'floor01_item07',
    'floor01_item06',
    'floor01_item05',

    'floor02_item104',
    'floor02_item105',
    'floor02_item106',
    'floor02_item107',
    'floor02_item108',

    'floor03_item115',
    'floor03_item116',
    'floor03_item117',
    'floor03_item118',
    'floor03_item119',
]
export const GREEN_GROUP = [
    'floor01_item15',
    'floor01_item16',
    'floor01_item17',
    'floor01_item18',
    'floor01_item19',
    'floor01_item20',
    'floor01_item21',
    'floor01_item22',
    'floor01_item23',
    'floor01_item24',
    'floor01_item25',
    'floor01_item26',

    'floor02_item130',
    'floor02_item131',
    'floor02_item132',
    'floor02_item162',
    'floor02_item133',
    'floor02_item134',
    'floor02_item135',
    'floor02_item136',
    'floor02_item137',
    'floor02_item138',
    'floor02_item163',

    'floor03_item163',
    'floor03_item164',
    'floor03_item165',
    'floor03_item166',
    'floor03_item167',
    'floor03_item168',
    'floor03_item169',
    'floor03_item170',
    'floor03_item171',
    'floor03_item172',
]
