import io
import re
import ftputil
import botocore
import import_scripts.common as common

def run(event, context):
    s3 = common.get_s3_connection()

    with ftputil.FTPHost('ftp.cmegroup.com', 'anonymous', 'anonymous') as ftp:
        ftp.chdir('settle')

        files = ftp.listdir('.')

        file_pattern = re.compile(".*\.\d*\.s\.csv$")
        files_to_copy = [file_name for file_name in files if file_pattern.match(file_name)]
        
        bucket = s3.Bucket(common.IMPORT_BUCKET_NAME)

        for file_name in files_to_copy:
            if ftp.path.isfile(file_name):
                move_file(ftp, file_name, s3, bucket)

        print('All files copied')        

        return 'SUCCESS'

def move_file(ftp, file_name, s3, bucket):
    s3_object = bucket.Object(common.SUB_DIRECTORY + file_name)

    file_size = ftp.stat(file_name).st_size
    with ftp.open(file_name, mode = 'rb') as file:
        try:
            if s3_object.content_length == file_size:
                print("Skipping '" + file_name + "'; it already exists")
                return
        except botocore.exceptions.ClientError as e:
            if e.response['Error']['Code'] != "404":
                raise e

        print("Copying '" + file_name + "' to '" + common.SUB_DIRECTORY + "' size: " + str(file_size))
        s3_object.upload_fileobj(file)