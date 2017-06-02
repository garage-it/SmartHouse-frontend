import { ConstructorComponent } from './constructor.component';
import { Observable } from 'rxjs';

describe('Constructor component', () => {
    let sut;
    let ActivatedRoute;
    let Router;
    let ConstructorService;
    let ToastsManager;
    let PictureResolverService;
    const someView = 'some view';
    const mapSubview = Symbol('mapSubview');
    const pictureUploadUrl = Symbol('pictureUploadUrl');

    beforeEach(() => {
        ActivatedRoute = {
            snapshot: {
                data: {
                    view: someView
                }
            }
        };
        Router = {
            navigate: jasmine.createSpy('navigate')
        };

        ConstructorService = {
            createOrUpdate: jasmine.createSpy('createOrUpdate'),
            confirm: jasmine.createSpy('confirm')
        };

        ToastsManager = {
            error: jasmine.createSpy('error')
        };

        PictureResolverService = {
            resolvePictureUploadUrl: jasmine.createSpy('resolvePictureUploadUrl').and.returnValue(pictureUploadUrl)
        };

        sut = new ConstructorComponent(
            ActivatedRoute,
            Router,
            ConstructorService,
            ToastsManager,
            PictureResolverService
        );
    });

    describe('on init', () => {
        it('should get resolved view from active route', () => {
            sut.ngOnInit();
            expect(sut.view).toEqual(someView);
        });

        it('should get empty view if no view from resolve', () => {
            delete sut.route.snapshot.data.view;
            sut.ngOnInit();
            expect(sut.view).toEqual({
                name: '',
                description: '',
                defaultSubview: 'mapSubview',
                dashboardSubview: {},
                mapSubview: {}
            });
        });
    });

    describe('on upload picture', () => {
        it('should get picture uploader', () => {
            const uploader = Symbol('uploader');
            sut.onUploadPicture(uploader);
            expect(sut.uploader).toEqual(uploader);
        });
    });

    describe('on save view', () => {
        beforeEach(() => {
            delete sut.route.snapshot.data.view;
            sut.ngOnInit();
        });

        describe('when not all mandatory fields are entered', () => {
            beforeEach(() => {
                sut.uploadPicture = jasmine.createSpy('create');
                sut.onSaveView();
            });

            it('should appear error popup', () => {
                expect(ToastsManager.error).toHaveBeenCalled();
            });

            it('should not be able to save', () => {
                expect(ConstructorService.createOrUpdate).not.toHaveBeenCalled();
            });

            it('should not save picture', () => {
                expect(sut.uploadPicture).not.toHaveBeenCalled();
            });

            it('should not redirect on home page', () => {
                expect(Router.navigate).not.toHaveBeenCalled();
            });
        });

        describe('when all mandatory fields are entered', () => {
            beforeEach(() => {
                sut.view.name = 'name';
                sut.view.description = 'description';
                sut.uploadPicture = jasmine.createSpy('create');
            });

            describe('when constructor is not gonna be saved', () => {
                beforeEach(() => {
                    sut.view.dashboardSubview = {
                        devices: [1]
                    };

                    ConstructorService.confirm.and.returnValue(Observable.of(false));
                    sut.onSaveView();
                });

                it('should not save view', () => {
                    expect(ConstructorService.createOrUpdate).not.toHaveBeenCalled();
                });
            });

            describe('when entered dashboard subview', () => {
                beforeEach(() => {
                    sut.view.dashboardSubview = {
                        devices: [1]
                    };
                    ConstructorService.createOrUpdate.and.returnValue(Observable.of({}));
                    ConstructorService.confirm.and.returnValue(Observable.of(true));

                    sut.onSaveView();
                });

                it('should not appear error popup', () => {
                    expect(ToastsManager.error).not.toHaveBeenCalled();
                });

                it('should be able to save', () => {
                    expect(ConstructorService.createOrUpdate).toHaveBeenCalledWith(sut.view);
                });

                it('should not save picture', () => {
                    expect(sut.uploadPicture).not.toHaveBeenCalled();
                });

                it('should redirect on home page', () => {
                    expect(Router.navigate).toHaveBeenCalled();
                });
            });

            describe('when entered picture for map', () => {
                beforeEach(() => {
                    sut.uploader = {
                        queue: [1]
                    };
                    ConstructorService.createOrUpdate.and.returnValue(Observable.of({mapSubview}));
                    ConstructorService.confirm.and.returnValue(Observable.of(true));

                    sut.onSaveView();
                });
                it('should not appear error popup', () => {
                    expect(ToastsManager.error).not.toHaveBeenCalled();
                });

                it('should be able to save', () => {
                    expect(ConstructorService.createOrUpdate).toHaveBeenCalledWith(sut.view);
                });

                it('should save picture', () => {
                    expect(sut.uploadPicture).toHaveBeenCalledWith(mapSubview);
                });
            });
        });
    });

    describe('upload picture', () => {
        beforeEach(() => {
            sut.uploader = {
                setOptions: jasmine.createSpy('setOptions'),
                uploadAll: jasmine.createSpy('uploadAll')
            };
            sut.uploadPicture(mapSubview);
        });

        it('should set options for uploader', () => {
            expect(sut.uploader.setOptions).toHaveBeenCalledWith({
                url: pictureUploadUrl
            });
        });

        it('should upload all in queue', () => {
            expect(sut.uploader.uploadAll).toHaveBeenCalled();
        });
    });
});
