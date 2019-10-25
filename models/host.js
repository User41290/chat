module.exports = function (sequelize, DataTypes) {
	return sequelize.define('host', {
		name: {type: DataTypes.STRING},
		group_tag: {type: DataTypes.STRING(64)},
		finance_option: {type: DataTypes.STRING(64)},
		token: {type: DataTypes.TEXT},
		secret_key: {type: DataTypes.TEXT},
		remark: {type: DataTypes.TEXT},
		url_format: {type: DataTypes.INTEGER},
		createdAt: {field: 'created_at',type: DataTypes.DATE},
		updatedAt: {field: 'updated_at',type: DataTypes.DATE},
		deleted_at: {type: DataTypes.DATE}		
	}, {
		tableName: 'host'
	});
};
