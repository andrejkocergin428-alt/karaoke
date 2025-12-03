import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';

export const images = async () => {
	return app.gulp
		.src(app.path.src.images, { encoding: false })
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({ title: 'IMAGES', message: 'Error: <%= error.message %>' }),
			),
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				imagemin({
					progressive: true,
					svgoPlugins: [{ removeViewBox: false }],
					interlaced: true,
					optimizationLevel: 4, //0 to 7
					quality: 50,
				}),
			),
		)
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.plugins.if(app.isBuild, webp()))
		.pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.images)))
		.pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.images)))
		.pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.images)))
		.pipe(app.gulp.src(app.path.src.images))
		.pipe(app.gulp.src(app.path.src.svg))
		.pipe(app.plugins.browsersync.stream());
};
