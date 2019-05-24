using OD.Interfaces.Interfaces;
using OD.Repository.Repository;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace OD.BLL
{
    public class UnitOfWork : IDisposable
    {

        private IUserRepository _userRepository;
        private IDiaryRepository _diaryRepository;
        private ITaskRepository _taskRepository;
        private ILogRepository _logRepository;

        public IUserRepository Users
        {
            get
            {
                if (this._userRepository == null)
                    this._userRepository = new UserRepository();
                return _userRepository;
            }
        }
        public IDiaryRepository Diary
        {
            get
            {
                if (this._diaryRepository == null)
                    this._diaryRepository = new DiaryRepository();
                return _diaryRepository;
            }
        }
        public ITaskRepository Task
        {
            get
            {
                if (this._taskRepository == null)
                    this._taskRepository = new TaskRepository();
                return _taskRepository;
            }
        }

        public ILogRepository Log
        {
            get
            {
                if (this._logRepository == null)
                    this._logRepository = new LogRepository();
                return _logRepository;
            }
        }

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    Debug.WriteLine("UnitOfWork is being disposed");

                }
            }
            this.disposed = true;
        }

        /// <summary>
        /// Dispose method
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}
